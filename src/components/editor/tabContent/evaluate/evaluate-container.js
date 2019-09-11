import React from 'react';
import { compose } from 'recompose';
import shortid from 'shortid';
import { withStyles } from '@material-ui/core/styles';

import styles from './evaluate-styles';
import Evaluate from './evaluate';

import { withFirebase } from '../../../firebase';

export default compose(
  withFirebase,
  withStyles(styles)
)(props => {
  const { inputState, setInputState } = props;

  const onPublishModule = () => {
    const data = { ...inputState };

    data.standards = data.standards.filter(x => x.stdCode || x.stdDesc);
    data.vocab = data.vocab.filter(x => x.vocab);
    data.resources = data.resources.filter(x => x.name);
    data.material_teacher = data.material_teacher.filter(x => x.teacherItem);
    data.material_student = data.material_student.filter(x => x.studentItem);
    data.material_group = data.material_group.filter(x => x.groupItem);
    data.steps = data.steps.filter(x => x.step);
    data.evaluate = data.evaluate.filter(x => x.question);

    props.firebase.module(inputState.id).set(data, { merge: true });
  };

  const handleMultiInputChange = (name, action) => {
    const newArray = inputState[name].map((item, index) => {
      if (index !== action.index) return item;

      return { ...item, [action.field]: action.value };
    });

    setInputState({ ...inputState, [name]: newArray });
  };

  const handleAddInput = (name, fields) => {
    let newArray;
    if (inputState[name] && inputState[name].length > 0) {
      newArray = [
        ...inputState[name].slice(0, inputState[name].length),
        { ...fields, id: shortid.generate() }
      ];
    } else {
      newArray = [{ ...fields, id: shortid.generate() }];
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

  return (
    <Evaluate
      onPublishModule={onPublishModule}
      handleMultiInputChange={handleMultiInputChange}
      handleAddInput={handleAddInput}
      handleRemoveInput={handleRemoveInput}
      {...props}
    />
  );
});
