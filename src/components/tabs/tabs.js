import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useStyles from './tabs-style';

export default props => {
  const classes = useStyles();
  const tabs = ['Overview', 'Explore', 'Explain', 'Elaborate', 'Evaluate'];

  return (
    <AppBar className={classes.appBarRoot} position='static' color='default'>
      <Tabs classes={{ indicator: classes.indicator }} {...props}>
        {tabs.map((label, i) => (
          <Tab key={i} className={classes.tabRoot} disableRipple label={label} />
        ))}
      </Tabs>
    </AppBar>
  );
};
