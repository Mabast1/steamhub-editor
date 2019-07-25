import React from 'react';

import TextField from '@material-ui/core/TextField';

export default ({ handleInputChange }) => (
  <TextField
    name='name'
    onChange={handleInputChange}
    variant='outlined'
    margin='dense'
    placeholder='Untitled folder'
    type='text'
    fullWidth
  />
);
