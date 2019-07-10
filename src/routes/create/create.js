import React from 'react';

import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import Tabs from '../../components/tabs';
import TabContainer from '../../components/tabs/tabContainer';
import Overview from '../../components/tabs/overview';

export default () => {
  const theme = useTheme();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [module, setModule] = React.useState({
    subject: '',
    modulePic: '',
    cogName: '',
    moduleName: '',
    moduleDesc: '',
    standards: [],
    vocab: [],
    matTeacher: [],
    matStudent: [],
    matGroup: []
  });

  function handleChange(event, newValue) {
    setTabIndex(newValue);
  }

  function handleChangeIndex(index) {
    setTabIndex(index);
  }

  function handleModule(newModule) {
    setModule(prevModule => ({
      ...prevModule,
      ...newModule
    }));
  }

  const tabContents = [
    <Overview handleModule={handleModule} />
  ];
  console.log(module);
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
