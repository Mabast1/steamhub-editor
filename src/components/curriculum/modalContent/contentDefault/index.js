import React from 'react';

import TextField from '@material-ui/core/TextField';

export default () => (
  <TextField
    variant='outlined'
    margin='dense'
    // label='Folder Name'
    placeholder='Untitled folder'
    type='text'
    fullWidth
  />
);
