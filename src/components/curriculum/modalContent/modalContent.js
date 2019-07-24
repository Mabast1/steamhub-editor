import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default props => {
  return (
    <React.Fragment>
      <DialogTitle className={props.classes.modalTitle}>New folder</DialogTitle>
      <DialogContent className={props.classes.modalContent}>
        {props.Content}
      </DialogContent>
      <DialogActions className={props.classes.modalActions}>
        <Button onClick={props.handleModalClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={props.handleModalClose} color='primary'>
          Create
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};
