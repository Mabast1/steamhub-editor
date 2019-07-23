import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import styles from './curriculum-styles';
import Curriculum from './curriculum';

import { withProtectedRoute } from '../session';

export default compose(
  withProtectedRoute(authUser => !!authUser),
  withStyles(styles)
)(props => {
  return <Curriculum {...props} />;
});
