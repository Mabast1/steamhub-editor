import React from 'react';

import * as ROUTES from '../../constants/routes';

const Landing = ({ history }) => {
  // Temporarily redirect to dashboard until we have a proper landing page
  React.useEffect(() => {
    history.replace(ROUTES.DASHBOARD);
  }, [history]);

  return <h1>Landing</h1>;
};

export default Landing;
