import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useStyles from './uploadBtn-styles';
import { withFirebase } from '../../firebase';

export default withFirebase(props => {
  const classes = useStyles();

  // TODO: Fix this?
  function handleModulePic(e) {
    const file = e.target.files[0];

    if (file && file.size < 5000000) {
      const uploadImg = props.firebase.storageRef().child(file.name);

      uploadImg.put(file).then(snapshot => {
        uploadImg
          .getDownloadURL()
          .then(url => document.getElementById(props.id).value = url)
          .catch(err => console.error(err));
      });
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        id={props.id}
        defaultValue=''
        placeholder='Paste URL or upload media'
        margin='dense'
        variant='outlined'
        inputProps={{ 'aria-label': 'bare' }}
        style={{ margin: 0, marginRight: '12px', width: '100%' }}
      />

      <Button
        component='label'
        variant='outlined'
        className={classes.browseBtnRoot}
      >
        Browse
        <input
          onChange={handleModulePic}
          type='file'
          style={{ display: 'none' }}
        />
      </Button>
    </div>
  );
});
