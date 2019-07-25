import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import styles from './drawer-styles';
import DrawerMenu from './drawerMenu';

export default withStyles(styles)(props => {
  const { classes, mobileOpen, handleDrawerToggle, handleModalOpen } = props;

  return (
    <nav className={classes.drawer} aria-label='Mailbox folders'>
      <Hidden smUp implementation='js'>
        <Drawer
          variant='temporary'
          anchor='left'
          open={mobileOpen}
          onClose={() => handleDrawerToggle(false)}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true
          }}
        >
          <DrawerMenu
            handleDrawerToggle={handleDrawerToggle}
            handleModalOpen={handleModalOpen}
          />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation='js'>
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant='permanent'
          open
        >
          <DrawerMenu
            handleDrawerToggle={handleDrawerToggle}
            handleModalOpen={handleModalOpen}
          />
        </Drawer>
      </Hidden>
    </nav>
  );
});
