import React from 'react';
import ContentLoader from 'react-content-loader';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';

import styles from './appBar-styles';

const MyLoader = () => (
  <ContentLoader
    height={20}
    width={200}
    speed={1}
    primaryColor='#f3f3f3'
    secondaryColor='#ecebeb'
  >
    <rect x='0' y='0' rx='11' ry='11' width='200' height='20' />
  </ContentLoader>
);

export default withStyles(styles)(props => {
  const { classes, moduleData, handleEditorDrawerToggle } = props;

  return (
    <AppBar position='fixed' elevation={0} className={classes.appBar}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='Open drawer'
          edge='start'
          onClick={() => handleEditorDrawerToggle(true)}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        {moduleData.module ? (
          <h2 className={classes.moduleName}>{moduleData.module}</h2>
        ) : (
          <div style={{ width: 200, height: 20 }}>
            <MyLoader />
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
});
