import React from 'react';

import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import UploadButton from './uploadBtn';

export default ({ classes, firebase, inputState, handleInputChange }) => {
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
      <div className={classes.modalUpload}>
        <UploadButton
          firebase={firebase}
          handleInputChange={handleInputChange}
        />
      </div>

      <div className={classes.modalDivider}>
        Module Description <Divider />
      </div>
      <TextField
        name='descr'
        value={descr ? descr : ''}
        onChange={e => handleInputChange(e.target.name, e.target.value)}
        variant='outlined'
        margin='dense'
        placeholder='Module description'
        type='text'
        multiline
        fullWidth
      />

      <div className={classes.modalDivider}>
        Module Number <Divider />
      </div>
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
      {moduleNumError && <p className={classes.errorMsg}>{moduleNumError}</p>}
    </React.Fragment>
  );
};
