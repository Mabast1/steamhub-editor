import React from 'react';

import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './create-styles';
import Tabs from '../../components/tabs';
import TabContainer from '../../components/tabs/tabContainer';
import Overview from '../../components/tabs/overview';

export default () => {
  const classes = useStyles();
  const theme = useTheme();
  const [tabIndex, setTabIndex] = React.useState(0);
  const tabContents = [<Overview />];

  function handleChange(event, newValue) {
    setTabIndex(newValue);
  }

  function handleChangeIndex(index) {
    setTabIndex(index);
  }

  return (
    <React.Fragment>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        variant='scrollable'
        scrollButtons='on'
      />
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tabIndex}
        onChangeIndex={handleChangeIndex}
      >
        {tabContents.map(component => (
          <TabContainer dir={theme.direction}>{component}</TabContainer>
        ))}
      </SwipeableViews>
    </React.Fragment>
  );
};
