import React from 'react';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default props => {
  return (
    <React.Fragment>
      <DialogTitle className={props.classes.modalTitle}>New folder</DialogTitle>
      <DialogContent className={props.classes.modalContent}>
        {props.Content}
      </DialogContent>
      <DialogActions className={props.classes.modalActions}>
        <Button onClick={props.handleModalClose} color='default'>
          Cancel
        </Button>
        <Button
          onClick={props.handleSubmit}
          variant='contained'
          color='primary'
        >
          Create
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};
