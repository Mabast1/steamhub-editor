import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import styles from './tabContent-styles';
import TabContent from './tabContent';

export default withStyles(styles)(props => {
  const [inputState, setInputState] = React.useState({});
  React.useEffect(() => {
    setInputState(props.moduleData);
  }, [props.moduleData]);

  function handleInputState(name, value) {
    setInputState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <TabContent
      inputState={inputState}
      handleInputState={handleInputState}
      tabIndex={props.tabIndex}
    />
  );
});
