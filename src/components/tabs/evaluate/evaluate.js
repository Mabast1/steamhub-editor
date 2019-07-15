import React from 'react';

import Portal from '@material-ui/core/Portal';
import Snackbar from '@material-ui/core/Snackbar';
import useStyles from './evaluate-styles';
import Questions from './questions';
import PublishButton from './publishButton';
import SnackbarContent from '../../snackbarContent';

export default () => {
  const classes = useStyles();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [published, setPublished] = React.useState(false);

  function handlePublished(status) {
    setPublished(status);
  }

  function handleClick() {
    setSnackbarOpen(true);
  }

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  }

  return (
    <div className={classes.center}>
      <Questions />
      <PublishButton handleClick={handleClick} handlePublished={handlePublished} />
      <Portal>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={snackbarOpen}
          autoHideDuration={10000}
          onClose={handleClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
        >
          <SnackbarContent
            onClose={handleClose}
            variant={published ? 'success' : 'error'}
            message={published ? 'Module published!' : 'Error missing forms detected!'}
          />
        </Snackbar>
      </Portal>
    </div>
  );
};
