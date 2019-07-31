import React from 'react';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default props => {
  const { classes, isInvalid, handleModalClose, handleSubmit } = props;
  return (
    <React.Fragment>
      <DialogTitle className={classes.modalTitle}>New folder</DialogTitle>
      <DialogContent className={classes.modalContent}>
        {props.Content}
      </DialogContent>
      <DialogActions className={classes.modalActions}>
        <Button onClick={handleModalClose} color='default'>
          Cancel
        </Button>
        <Button
          className={classes.submitBtn}
          disabled={isInvalid}
          onClick={handleSubmit}
          variant='contained'
        >
          Create
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};
