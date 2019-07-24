import React from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';

import styles from './appBar-styles';

export default compose(
  withRouter,
  withStyles(styles)
)(({ classes, handleDrawerToggle, history, location: { pathname } }) => {
  const prevPath = pathname.split('/').filter(x => x).slice(0, -1);

  return (
    <AppBar position='fixed' elevation={0} className={classes.appBar}>
      {/* TODO: Split searchbar into another component */}
      <div className={classes.searchBar}>
        <Hidden smUp implementation='js'>
          {prevPath.length < 1 ? (
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              edge='start'
              onClick={() => handleDrawerToggle(true)}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              color='inherit'
              aria-label='Go back'
              edge='start'
              onClick={() => history.push(`/${prevPath.join('/')}`)}
              className={classes.menuButton}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
        </Hidden>
        {/* Show search icon on larger devices */}
        <Hidden xsDown implementation='js'>
          <IconButton
            color='inherit'
            aria-label='Search'
            edge='start'
            className={classes.menuButton}
          >
            <SearchIcon />
          </IconButton>
        </Hidden>

        {/* TODO: Make searchbar functional */}
        <InputBase
          className={classes.searchInput}
          placeholder='Search'
          inputProps={{ 'aria-label': 'Search' }}
          name='search'
          type='text'
          autoComplete='off'
          // onChange={onChange}
        />
      </div>
    </AppBar>
  );
});
