import React from 'react';
import shortid from 'shortid';
import { withStyles } from '@material-ui/core/styles';

import styles from './materials-styles';
import Materials from './materials';

export default withStyles(styles)(props => {
  const { inputState, setInputState } = props;

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
    <Materials
      handleMultiInputChange={handleMultiInputChange}
      handleAddInput={handleAddInput}
      handleRemoveInput={handleRemoveInput}
      {...props}
    />
  );
});
