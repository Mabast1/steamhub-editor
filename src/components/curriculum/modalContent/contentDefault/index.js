import React from 'react';

import TextField from '@material-ui/core/TextField';

export default ({ inputState, handleInputChange }) => {
  const { name, tag } = inputState;

  return (
    <React.Fragment>
      <TextField
        name='name'
        value={name ? name : ''}
        onChange={e => handleInputChange(e.target.name, e.target.value)}
        variant='outlined'
        margin='dense'
        placeholder='Folder name'
        type='text'
        fullWidth
      />

      <TextField
        name='tag'
        value={tag ? tag : ''}
        onChange={e => handleInputChange(e.target.name, e.target.value)}
        variant='outlined'
        margin='dense'
        placeholder='Sub-folder tag'
        type='text'
        fullWidth
      />
    </React.Fragment>
  );
};
