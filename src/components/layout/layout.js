import React from 'react';

import Drawer from './drawer';
import AppBar from './appBar';

export default ({ classes, mobileOpen, handleDrawerToggle, children }) => (
  <div className={classes.root}>
    {/* Header */}
    <AppBar handleDrawerToggle={handleDrawerToggle} />

    {/* Side Nav */}
    <Drawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

    {/* Main Content */}
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {children}
    </main>
  </div>
);
