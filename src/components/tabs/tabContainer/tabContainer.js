import React from 'react';
import Typography from '@material-ui/core/Typography';

export default ({ children, dir }) => (
  <Typography component='div' dir={dir}>
    {children}
  </Typography>
);
