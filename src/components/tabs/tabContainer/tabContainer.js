import React from 'react';
import Typography from '@material-ui/core/Typography';

const style = {
  maxWidth: '960px',
  margin: '48px auto'
}

export default ({ children, dir }) => (
  <Typography component='div' dir={dir} style={style}>
    {children}
  </Typography>
);
