import React from 'react';
import shortid from 'shortid';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import styles from './contentCog-styles';
import ContentCog from './contentCog';

import { withFirebase } from '../../../firebase';

export default compose(
  withFirebase,
  withStyles(styles)
)(props => {
  const { inputState, setInputState, params } = props;

  let gradeLevels = [
    { value: '', text: 'Select grade level' },
    { value: 'All', text: 'N/A' },
    { value: 'Sparks', text: 'Sparks' },
    { value: 'Innovators', text: 'Innovators' },
    { value: 'Inventors', text: 'Inventors' }
  ];
  if (params[1] === 'STEM Academy') {
    gradeLevels = [
      { value: '', text: 'Select grade level' },
      { value: 'All', text: 'N/A' },
      { value: 'Kinder', text: 'Kinder' },
      { value: 'First', text: 'First' },
      { value: 'Second', text: 'Second' },
      { value: 'Third', text: 'Third' },
      { value: 'Fourth', text: 'Fourth' },
      { value: 'Fifth', text: 'Fifth' }
    ];
  }

  const handleMultiInputChange = (name, action) => {
    const newArray = inputState[name].map((item, index) => {
      if (index !== action.index) return item;

      return { ...item, text: action.item };
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

  return (
    <ContentCog
      gradeLevels={gradeLevels}
      handleMultiInputChange={handleMultiInputChange}
      handleAddInput={handleAddInput}
      handleRemoveInput={handleRemoveInput}
      {...props}
    />
  );
});
