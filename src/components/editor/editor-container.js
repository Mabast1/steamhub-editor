import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import styles from './editor-styles';
import Editor from './editor';

export default withStyles(styles)(props => {
  return <Editor classes={props.classes} />;
});
