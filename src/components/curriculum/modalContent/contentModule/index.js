import React from 'react';

import TextField from '@material-ui/core/TextField';

export default ({ inputState, handleInputChange }) => {
  const { name, descr, moduleNum, moduleNumError } = inputState;

  return (
    <React.Fragment>
      <TextField
        name='name'
        value={name ? name : ''}
        onChange={e => handleInputChange(e.target.name, e.target.value)}
        variant='outlined'
        margin='dense'
        placeholder='Module name'
        type='text'
        fullWidth
      />

      <TextField
        name='descr'
        value={descr ? descr : ''}
        onChange={e => handleInputChange(e.target.name, e.target.value)}
        variant='outlined'
        margin='dense'
        placeholder='Module overview'
        type='text'
        multiline
        fullWidth
      />

      <TextField
        name='moduleNum'
        value={moduleNum ? moduleNum : ''}
        onChange={e => {
          if (moduleNumError) handleInputChange('moduleNumError', '');
          handleInputChange(e.target.name, e.target.value);
        }}
        variant='outlined'
        margin='dense'
        placeholder='Module number'
        type='number'
        InputProps={{ inputProps: { min: 1 } }}
        fullWidth
      />
      {moduleNumError && <p>{moduleNumError}</p>}
    </React.Fragment>
  );
};
