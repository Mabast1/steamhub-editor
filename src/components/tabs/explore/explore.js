import React from 'react';

import TextField from '@material-ui/core/TextField';
import useStyles from './explore-styles';
import UploadButton from '../uploadBtn';
import StepsForm from './stepsForm';

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.center}>
      <h2>Engage</h2>
      <TextField
        placeholder='Enter class engagement strategies'
        multiline
        style={{ marginBottom: '18px' }}
      />
      <UploadButton />
      <p
        style={{
          margin: 0,
          marginTop: '6px',
          color: 'rgba(112,112,112,0.45)',
          fontSize: '12px'
        }}
      >
        (Optional) upload max 1 media up to 5 MB
      </p>

      <h2>Explore</h2>
      <StepsForm />
    </div>
  );
};
