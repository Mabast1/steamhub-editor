import React from 'react';

import Resources from './resources';

export default props => {
  const tabContent = [
    <Resources {...props} />,
    <p>Materials Tab</p>,
    <p>Engage Tab</p>,
    <p>Explore Tab</p>,
    <p>Explain Tab</p>,
    <p>Elaborate Tab</p>,
    <p>Evaluate Tab</p>
  ];

  return (
    <React.Fragment>
      {props.inputState.id && tabContent[props.tabIndex]}
    </React.Fragment>
  );
};
