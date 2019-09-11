import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import styles from './modalContent-styles';
import ModalContent from './modalContent';
import ContentDefault from './contentDefault';
import ContentCog from './contentCog';
import ContentModule from './contentModule';

import { withFirebase } from '../../firebase';
import { containSpecialChar } from '../../../utils/string';

const mapStateToProps = state => ({
  currentFolderInfo: state.currentFolderInfo
});

export default compose(
  connect(mapStateToProps),
  withFirebase,
  withStyles(styles)
)(props => {
  const { params, firebase, currentFolderInfo, handleModalClose } = props;
  const [inputState, setInputState] = React.useState({});

  // Set form based on the current folder
  let filteredSkills = [];
  let isInvalid =
    !inputState.name || containSpecialChar(inputState.name) || !inputState.tag;
  let Content = (
    <ContentDefault
      inputState={inputState}
      handleInputChange={handleInputChange}
    />
  );

  if (currentFolderInfo.tag === 'cog') {
    if (inputState.skills)
      filteredSkills = inputState.skills.filter(x => x.text).map(x => x.text);

    isInvalid =
      !inputState.name ||
      containSpecialChar(inputState.name) ||
      !inputState.url ||
      !inputState.descr ||
      !inputState.subject ||
      !inputState.grade ||
      !inputState.rwc ||
      filteredSkills.length === 0;
    Content = (
      <ContentCog
        inputState={inputState}
        setInputState={setInputState}
        params={params}
        handleInputChange={handleInputChange}
      />
    );
  } else if (currentFolderInfo.tag === 'module') {
    isInvalid =
      !inputState.name ||
      containSpecialChar(inputState.name) ||
      !inputState.url ||
      !inputState.descr ||
      !inputState.moduleNum;
    Content = (
      <ContentModule
        inputState={inputState}
        handleInputChange={handleInputChange}
      />
    );
  }

  function handleInputChange(name, value) {
    setInputState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleSubmit() {
    let dbPath = '';
    params.forEach((path, index) => {
      if (index === 1) dbPath = `folder/${path}`;
      else if (index !== 0) dbPath += `/folder/${path}`;
    });

    // TODO: Possibly check for duplicate, dont just merge folder.
    const addFolder = (document, id) => {
      firebase
        .getDocument(`${dbPath}/folder/${id}`)
        .set(document, { merge: true });
    };

    if (currentFolderInfo.tag === 'cog') {
      firebase
        .cogs()
        .add({
          cogname: inputState.name,
          cover: inputState.url,
          descr: inputState.descr,
          subject: inputState.subject,
          grade: inputState.grade,
          rwc: [inputState.rwc],
          skills: filteredSkills,
          type: params[1],
          viewed: 0
        })
        .then(doc => {
          addFolder(
            {
              refId: doc.id,
              type: 'folder',
              tag: 'module'
            },
            inputState.name
          );
        });

      handleModalClose();
    } else if (currentFolderInfo.tag === 'module') {
      // TODO: Optimize this to make less request
      let isDuplicateModule = false;
      let modules, cogname;

      firebase
        .cog(currentFolderInfo.refId)
        .get()
        .then(doc => {
          const data = doc.data();
          modules = data.modules ? data.modules : [];
          cogname = data.cogname;

          modules.forEach(module => {
            if (module.module_number === inputState.moduleNum) {
              isDuplicateModule = true;
            }
          });
        })
        .then(() => {
          if (!isDuplicateModule) {
            firebase.cog(currentFolderInfo.refId).set(
              {
                modules: [
                  ...modules,
                  {
                    descr: inputState.descr,
                    name: inputState.name,
                    module_number: inputState.moduleNum
                  }
                ]
              },
              { merge: true }
            );

            firebase
              .modules()
              .add({
                module: inputState.name,
                cogname: cogname,
                cover: inputState.url,
                overview: inputState.descr,
                module_number: inputState.moduleNum
              })
              .then(doc => {
                addFolder(
                  {
                    name: inputState.name,
                    type: 'file'
                  },
                  doc.id
                );
              });

            handleModalClose();
          } else {
            handleInputChange(
              'moduleNumError',
              'Module number has already been taken.'
            );
          }
        });
    } else {
      addFolder(
        {
          type: 'folder',
          tag: inputState.tag
        },
        inputState.name
      );

      handleModalClose();
    }
  }

  return (
    <ModalContent
      Content={Content}
      isInvalid={isInvalid}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      {...props}
    />
  );
});