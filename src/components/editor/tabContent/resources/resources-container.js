import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import styles from './resources-styles';
import Resource from './resources';

export default withStyles(styles)(props => {
  return <Resource {...props} />;
});
