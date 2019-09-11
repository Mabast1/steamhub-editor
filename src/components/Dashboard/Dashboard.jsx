import React from 'react';
import compose from 'recompose/compose';

import Layout from '../Layout';
import withProtectedRoute from '../ProtectedRoute';
import { withFirebase } from '../Firebase';

const Dashboard = ({ firebase, location: { pathname } }) => {
  return (
    <Layout pathname={pathname}>
      <h1 style={{ margin: 0 }}>Dashboard</h1>
      <button type="button" onClick={firebase.doSignOut}>
        Sign Out
      </button>
    </Layout>
  );
};

export default compose(
  withProtectedRoute(authUser => !!authUser),
  withFirebase
)(Dashboard);
