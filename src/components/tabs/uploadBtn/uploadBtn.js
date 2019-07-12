import React from 'react';
import Button from '@material-ui/core/Button';
import useStyles from './uploadBtn-styles';
import { withFirebase } from '../../firebase';

export default withFirebase(props => {
  const classes = useStyles();

  // TODO: Fix this?
  function handleModulePic(e) {
    const file = e.target.files[0];
    console.log(file);
    // if (file && file.size < 5000000) {
    //   const uploadImg = props.firebase.storageRef().child(file.name);

    //   uploadImg.put(file).then(snapshot => {
    //     uploadImg
    //       .getDownloadURL()
    //       .then(url => console.log(url))
    //       .catch(err => console.error(err));
    //   });
    // }
  }

  return (
    <div>
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
