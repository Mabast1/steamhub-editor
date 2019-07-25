import React from 'react';
import shortid from 'shortid';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import styles from './modalContent-styles';
import ModalContent from './modalContent';
import ContentDefault from './contentDefault';
import ContentCog from './contentCog';

import { withFirebase } from '../../firebase';

export default compose(
  withFirebase,
  withStyles(styles)
)(props => {
  const [inputState, setInputState] = React.useState({});

  const handleInputChange = e => {
    setInputState({ ...inputState, [e.target.name]: e.target.value });
  };

  const handleUploadMedia = e => {
    const file = e.target.files[0];

    if (file && file.size < 5000000) {
      const uploadImg = props.firebase
        .storageRef('/cog')
        .child(`${Date.now()}-${file.name}`);

      uploadImg.put(file).then(snapshot => {
        uploadImg
          .getDownloadURL()
          .then(url => setInputState({ ...inputState, url }))
          .catch(err => console.error(err));
      });
    }
  };

  const handleMultiInputChange = (name, action) => {
    const newArray = inputState[name].map((skill, index) => {
      if (index !== action.index) return skill;

      return { ...skill, text: action.item };
    });

    setInputState({ ...inputState, [name]: newArray });
  };

  const handleAddInput = name => {
    let newArray;
    if (inputState[name] && inputState[name].length > 0) {
      newArray = [
        ...inputState[name].slice(0, inputState[name].length),
        { id: shortid.generate(), text: '' }
      ];
    } else {
      newArray = [{ id: shortid.generate(), text: '' }];
    }

    setInputState({ ...inputState, [name]: newArray });
  };

  const handleRemoveInput = (name, index) => {
    const newArray = [
      ...inputState[name].slice(0, index),
      ...inputState[name].slice(index + 1)
    ];

    setInputState({ ...inputState, [name]: newArray });
  };

  const handleSubmit = () => {
    switch (props.params.length) {
      case 1:
        if (inputState.name && inputState.name !== '') {
          props.firebase.services().add({
            service: inputState.name
          });
          props.handleModalClose();
        }
        break;
      case 2:
        if (inputState.name && inputState.name !== '') {
          props.firebase.levels().add({
            level: inputState.name,
            service: props.params[1]
          });
          props.handleModalClose();
        }
        break;
      case 3:
        if (inputState.name && inputState.name !== '') {
          props.firebase.subjects().add({
            subject: inputState.name,
            level: props.params[2],
            service: props.params[1]
          });
          props.handleModalClose();
        }
        break;
      case 4:
        // Make sure there is no empty inputs
        const skills = inputState.skills.filter(x => x.text).map(x => x.text);

        if (
          inputState.name &&
          inputState.name !== '' &&
          inputState.url &&
          inputState.url !== '' &&
          inputState.descr &&
          inputState.descr !== '' &&
          inputState.rwc &&
          inputState.rwc !== '' &&
          inputState.skills.length > 0
        ) {
          props.firebase.cogs().add({
            cogname: inputState.name,
            cover: inputState.url,
            descr: inputState.descr,
            grade: props.params[2],
            rwc: [inputState.rwc],
            skills,
            subject: props.params[3],
            type: props.params[1]
          });
          props.handleModalClose();
        }
        break;
      default:
        props.handleModalClose();
        break;
    }
  };

  let Content;
  switch (props.params.length) {
    case 4:
      // TODO: Move all of these handler into the child component
      // and only pass inputState and setInputState
      Content = (
        <ContentCog
          inputState={inputState}
          handleUploadMedia={handleUploadMedia}
          handleInputChange={handleInputChange}
          handleMultiInputChange={handleMultiInputChange}
          handleAddInput={handleAddInput}
          handleRemoveInput={handleRemoveInput}
        />
      );
      break;
    default:
      Content = <ContentDefault handleInputChange={handleInputChange} />;
      break;
  }

  return (
    <ModalContent
      inputState={inputState}
      Content={Content}
      handleSubmit={handleSubmit}
      {...props}
    />
  );
});
