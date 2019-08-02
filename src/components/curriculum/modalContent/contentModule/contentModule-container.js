import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import styles from './contentModule-style';
import ContentModule from './contentModule';

import { withFirebase } from '../../../firebase';

export default compose(
  withFirebase,
  withStyles(styles)
)(props => {
  return <ContentModule {...props} />;
});
