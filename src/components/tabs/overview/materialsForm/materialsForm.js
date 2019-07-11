import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import MaterialsInput from './materialsInput';

function TabContainer({ children, dir }) {
  return (
    <Typography component='div' dir={dir} style={{ paddingTop: '24px', marginBottom: '60px' }}>
      {children}
    </Typography>
  );
}

export default () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
  }

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
      >
        <Tab disableRipple label='Teacher' />
        <Tab disableRipple label='Student' />
        <Tab disableRipple label='Group' />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabContainer dir={theme.direction}><MaterialsInput input='teacher'/></TabContainer>
        <TabContainer dir={theme.direction}><MaterialsInput input='student'/></TabContainer>
        <TabContainer dir={theme.direction}><MaterialsInput input='group'/></TabContainer>
      </SwipeableViews>
    </div>
  );
};
