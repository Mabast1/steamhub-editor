import React from 'react';

import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
// import useStyles from './questionForm-styles';

export default ({ id }) => {
  const options = ['A', 'B', 'C', 'D'];
  // const classes = useStyles();
  const [value, setValue] = React.useState('');

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        id={`question-${id}`}
        placeholder='Enter question'
        multiline
        style={{ width: '100%', marginTop: '8px', marginBottom: '24px' }}
      />
      {options.map(option => (
        <div
          key={`question-${id}-option-${option}`}
          style={{ display: 'flex' }}
        >
          <Radio
            checked={value === option}
            onChange={handleChange}
            value={option}
            name='question-option'
            inputProps={{ 'aria-label': option }}
            style={{ display: 'inline-table' }}
          />
          <TextField
            id={`question-${id}-option-${option}`}
            placeholder={`Enter answer option ${option}`}
            multiline
            style={{ width: '100%' }}
          />
        </div>
      ))}

      <p id={`answer-${id}`} style={{ display: 'none' }}>
        {value}
      </p>
    </div>
  );
};
