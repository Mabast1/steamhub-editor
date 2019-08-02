import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import styles from './drawer-styles';
import DrawerMenu from './drawerMenu';

export default withStyles(styles)(props => {
  const {
    classes,
    handleTabIndexChange,
    editorDrawerOpen,
    handleEditorDrawerToggle
  } = props;

  return (
    <nav className={classes.drawer} aria-label='Module sections'>
      <Hidden mdUp implementation='js'>
        <Drawer
          variant='temporary'
          anchor='left'
          open={editorDrawerOpen}
          onClose={() => handleEditorDrawerToggle(false)}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true
          }}
        >
          <DrawerMenu
            handleEditorDrawerToggle={handleEditorDrawerToggle}
            handleTabIndexChange={handleTabIndexChange}
          />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation='js'>
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant='permanent'
          open
        >
          <DrawerMenu
            handleEditorDrawerToggle={handleEditorDrawerToggle}
            handleTabIndexChange={handleTabIndexChange}
          />
        </Drawer>
      </Hidden>
    </nav>
  );
});
