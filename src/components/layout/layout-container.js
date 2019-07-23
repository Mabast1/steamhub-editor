import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import styles from './layout-styles';
import Layout from './layout';

export default withStyles(styles)(props => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle(toggle) {
    setMobileOpen(toggle);
  }

  return (
    <Layout
      mobileOpen={mobileOpen}
      handleDrawerToggle={handleDrawerToggle}
      {...props}
    />
  );
});
