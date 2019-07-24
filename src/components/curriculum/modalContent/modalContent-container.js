import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import styles from './modalContent-styles';
import ModalContent from './modalContent';
import ContentDefault from './contentDefault';

export default withStyles(styles)(props => {
  let Content;
  switch (props.params.length) {
    default:
      Content = <ContentDefault />;
      break;
  }

  return <ModalContent {...props} Content={Content} />;
});
