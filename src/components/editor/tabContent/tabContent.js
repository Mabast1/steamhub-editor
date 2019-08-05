import React from 'react';

import Resources from './resources';
import Materials from './materials';
import Engage from './engage';
import Explore from './explore';
import Explain from './explain';
import Elaborate from './elaborate';
import Evaluate from './evaluate';

export default props => {
  const tabContent = [
    <Resources {...props} />,
    <Materials {...props} />,
    <Engage {...props} />,
    <Explore {...props} />,
    <Explain {...props} />,
    <Elaborate {...props} />,
    <Evaluate {...props} />
  ];

  return (
    <React.Fragment>
      {props.inputState.id && tabContent[props.tabIndex]}
    </React.Fragment>
  );
};
