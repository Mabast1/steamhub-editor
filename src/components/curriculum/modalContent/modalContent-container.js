import React from 'react';
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
        let filteredSkills;
        const { name, url, descr, rwc, skills } = inputState;

        // Make sure there is no empty inputs
        if (skills && skills.length > 0) {
          filteredSkills = skills.filter(x => x.text).map(x => x.text);
        } else {
          filteredSkills = [];
        }

        if (
          (name && name !== '') &&
          (url && url !== '') &&
          (descr && descr !== '') &&
          (rwc && rwc !== '') &&
          filteredSkills.length > 0
        ) {
          props.firebase.cogs().add({
            cogname: name,
            cover: url,
            descr: descr,
            grade: props.params[2],
            rwc: [rwc],
            skills: filteredSkills,
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
      Content = (
        <ContentCog
          inputState={inputState}
          setInputState={setInputState}
          handleInputChange={handleInputChange}
        />
      );
      break;
    default:
      Content = <ContentDefault handleInputChange={handleInputChange} />;
      break;
  }

  return (
    <ModalContent Content={Content} handleSubmit={handleSubmit} {...props} />
  );
});
