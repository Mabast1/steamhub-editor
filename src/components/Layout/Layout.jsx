import React from 'react';
import compose from 'recompose/compose';
import { Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import DashboardIcon from '@material-ui/icons/HomeRounded';
import FolderIcon from '@material-ui/icons/FolderRounded';
import ProfileCircleIcon from '@material-ui/icons/AccountCircle';
import ProfileIcon from '@material-ui/icons/PersonRounded';
import SearchIcon from '@material-ui/icons/Search';

import styles from './Layout-styles';
import idealabLogo from '../../media/logo.png';
import * as ROUTES from '../../constants/routes';

const Layout = ({ classes, children, location: { pathname } }) => {
  return (
    <>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Hidden smUp implementation="js">
          <nav className="mobile-menu">
            <IconButton component={Link} to={ROUTES.DASHBOARD} aria-label="dashboard">
              <DashboardIcon className={pathname === ROUTES.DASHBOARD ? 'selected' : ''} />
            </IconButton>
            <IconButton component={Link} to={ROUTES.CURRICULUM} aria-label="curriculum">
              <FolderIcon className={pathname === ROUTES.CURRICULUM ? 'selected' : ''} />
            </IconButton>
            <IconButton component={Link} to={ROUTES.PROFILE} aria-label="profile">
              <ProfileIcon className={pathname === ROUTES.PROFILE ? 'selected' : ''} />
            </IconButton>
          </nav>
        </Hidden>

        <Hidden xsDown implementation="js">
          <nav className="desktop-menu">
            <Link to={ROUTES.DASHBOARD}>
              <img height={36} src={idealabLogo} alt="Idealab logo" />
            </Link>

            <div className="search-bar">
              <InputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
              <div className="search-icon">
                <SearchIcon fontSize="small" />
              </div>
            </div>

            <ul>
              <li className={pathname === ROUTES.DASHBOARD ? 'selected' : ''}>
                <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
              </li>
              <li className={pathname === ROUTES.CURRICULUM ? 'selected' : ''}>
                <Link to={ROUTES.CURRICULUM}>Curriculum</Link>
              </li>
            </ul>

            <IconButton edge="end" aria-label="profile">
              <ProfileCircleIcon className="profile-icon" />
            </IconButton>
          </nav>
        </Hidden>
      </AppBar>

      <main className={classes.mainRoot}>{children}</main>
    </>
  );
};

export default compose(
  withRouter,
  withStyles(styles)
)(Layout);
