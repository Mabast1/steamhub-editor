import React from 'react';

import Layout from '../Layout';
import withProtectedRoute from '../ProtectedRoute';

const Profile = ({ location: { pathname } }) => {
  return (
    <Layout pathname={pathname}>
      <h1 style={{ margin: 0 }}>Profile</h1>
    </Layout>
  );
};

export default withProtectedRoute(authUser => !!authUser)(Profile);
