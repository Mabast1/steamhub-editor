import React from 'react';
import shortid from 'shortid';
import { withStyles } from '@material-ui/core/styles';

import styles from './tabContent-styles';
import TabContent from './tabContent';

export default withStyles(styles)(props => {
  const [inputState, setInputState] = React.useState({});
  React.useEffect(() => {
    let data = props.moduleData;

    if (!data.standards || data.standards.length === 0) {
      data.standards = [{ id: shortid.generate(), stdCode: '', stdDesc: '' }];
    }

    if (!data.vocab || data.vocab.length === 0) {
      data.vocab = [{ id: shortid.generate(), vocab: '', vocabDef: '' }];
    }

    if (!data.material_teacher || data.material_teacher.length === 0) {
      data.material_teacher = [
        {
          id: shortid.generate(),
          teacherItem: '',
          teacherQuantity: '',
          teacherNote: ''
        }
      ];
    }

    if (!data.material_student || data.material_student.length === 0) {
      data.material_student = [
        {
          id: shortid.generate(),
          studentItem: '',
          studentQuantity: '',
          studentNote: ''
        }
      ];
    }

    if (!data.material_group || data.material_group.length === 0) {
      data.material_group = [
        {
          id: shortid.generate(),
          groupItem: '',
          groupQuantity: '',
          groupNote: ''
        }
      ];
    }

    if (!data.engage) {
      data.engage = {
        text: '',
        media: {
          type: '',
          url: ''
        }
      };
    }

    if (!data.explain) {
      data.explain = {
        text: '',
        media: {
          type: '',
          url: ''
        }
      };
    }

    if (!data.elaborate) {
      data.elaborate = {
        text: '',
        media: {
          type: '',
          url: ''
        }
      };
    }

    if (!data.steps || data.steps.length === 0) {
      data.steps = [
        {
          id: shortid.generate(),
          step: '',
          stepMedia: {
            type: '',
            url: ''
          }
        }
      ];
    }

    if (!data.evaluate || data.evaluate.length === 0) {
      data.evaluate = [
        {
          id: shortid.generate(),
          answer: '',
          optionA: '',
          optionB: '',
          optionC: '',
          optionD: '',
          question: ''
        }
      ];
    }

    setInputState(data);
  }, [props.moduleData]);

  function handleInputState(name, value) {
    setInputState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <TabContent
      inputState={inputState}
      setInputState={setInputState}
      handleInputState={handleInputState}
      tabIndex={props.tabIndex}
    />
  );
});
