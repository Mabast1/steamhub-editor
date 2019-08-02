import React from 'react';

import Drawer from './drawer';
import AppBar from './appBar';
import Tab from './tabContent';

export default props => {
  const {
    moduleData,
    classes,
    tabIndex,
    handleTabIndexChange,
    editorDrawerOpen,
    handleEditorDrawerToggle
  } = props;

  return (
    <div className={classes.root}>
      {/* Header */}
      <AppBar
        moduleData={moduleData}
        handleEditorDrawerToggle={handleEditorDrawerToggle}
      />

      {/* Side Nav */}
      <Drawer
        editorDrawerOpen={editorDrawerOpen}
        handleEditorDrawerToggle={handleEditorDrawerToggle}
        handleTabIndexChange={handleTabIndexChange}
      />

      {/* Main Content */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Tab tabIndex={tabIndex} moduleData={moduleData} />
      </main>
    </div>
  );
};
