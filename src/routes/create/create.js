import React from 'react';

import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import Tabs from '../../components/tabs';
import TabContainer from '../../components/tabs/tabContainer';
import Overview from '../../components/tabs/overview';
import Evaluate from '../../components/tabs/evaluate';

export default () => {
  const theme = useTheme();
  const [tabIndex, setTabIndex] = React.useState(0);

  function handleChange(event, newValue) {
    setTabIndex(newValue);
  }

  function handleChangeIndex(index) {
    setTabIndex(index);
  }

  const tabContents = [
    <Overview />,
    <Evaluate />
  ];

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
        {tabContents.map((component, i) => (
          <TabContainer key={i} dir={theme.direction}>
            {component}
          </TabContainer>
        ))}
      </SwipeableViews>
    </React.Fragment>
  );
};
