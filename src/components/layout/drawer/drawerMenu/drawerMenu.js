import React from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/HomeOutlined';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import HelpIcon from '@material-ui/icons/HelpOutline';

import styles from './drawerMenu-styles';
import * as ROUTES from '../../../../constants/routes';

export default withStyles(styles)(({ classes, handleDrawerToggle }) => (
  <div>
    <div className={classes.toolbar} />
    <Divider />
    <List>
      <ListItem
        component={Link}
        to={ROUTES.HOME}
        button
        className={classes.drawerListItem}
        onClick={() => handleDrawerToggle(false)}
      >
        <ListItemIcon className={classes.drawerMenuIcon}>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItem>
      <ListItem
        component={Link}
        to={ROUTES.CURRICULUM}
        button
        className={classes.drawerListItem}
        onClick={() => handleDrawerToggle(false)}
      >
        <ListItemIcon className={classes.drawerMenuIcon}>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary='Curriculum' />
      </ListItem>
      <ListItem button className={classes.drawerListItem}>
        <ListItemIcon className={classes.drawerMenuIcon}>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary='Settings' />
      </ListItem>
      <ListItem button className={classes.drawerListItem}>
        <ListItemIcon className={classes.drawerMenuIcon}>
          <HelpIcon />
        </ListItemIcon>
        <ListItemText primary='Help' />
      </ListItem>
    </List>
  </div>
));
