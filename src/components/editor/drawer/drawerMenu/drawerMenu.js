import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import WarningIcon from '@material-ui/icons/Warning';

import styles from './drawerMenu-styles';

export default withStyles(styles)(props => {
  const { classes, handleTabIndexChange, handleEditorDrawerToggle } = props;
  const tabs = [
    'Resources',
    'Materials',
    'Engage',
    'Explore',
    'Explain',
    'Elaborate',
    'Evaluate'
  ];

  return (
    <div className={classes.drawerMenuContainer}>
      <div className={classes.toolbar} />
      <List>
        {tabs.map((tab, index) => (
          <ListItem
            key={tab}
            button
            className={classes.drawerListItem}
            onClick={() => {
              handleTabIndexChange(index);
              handleEditorDrawerToggle(false);
            }}
          >
            <ListItemText primary={tab} />
            <ListItemIcon className={classes.drawerMenuIcon}>
              <WarningIcon fontSize='small' />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </div>
  );
});
