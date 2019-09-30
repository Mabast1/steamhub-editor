import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

import useStyles from '../ModuleEditor-styles';
import { withFirebase } from '../../../Firebase';

const NewSectionDialog = ({ firebase, authUser, tabs, handleClose }) => {
  const classes = useStyles();
  const [templateTitle, setTemplateTitle] = React.useState('');

  const handleInputChange = value => {
    setTemplateTitle(value);
  };

  const handleSubmit = () => {
    firebase.templates(authUser.uid).add({
      tabs: [...tabs],
      name: templateTitle,
      isPublic: false,
    });

    handleClose();
  };

  return (
    <>
      <DialogContent>
        <p className="dialog-title">Save as template</p>
        <TextField
          className={classes.input}
          value={templateTitle}
          onChange={e => handleInputChange(e.target.value)}
          placeholder="Enter template name"
          variant="outlined"
          inputProps={{ 'aria-label': 'Template name' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" disabled={!templateTitle}>
          Ok
        </Button>
      </DialogActions>
    </>
  );
};

// Redux state management
const mapStateToProps = state => ({
  authUser: state.authUser,
});

export default compose(
  connect(mapStateToProps),
  withFirebase
)(NewSectionDialog);
