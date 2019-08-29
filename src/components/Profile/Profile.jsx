import React from 'react';

import Layout from '../Layout';
import withProtectedRoute from '../ProtectedRoute';

const Profile = () => {
  return (
    <Layout>
      <h1 style={{ margin: 0 }}>Profile</h1>
    </Layout>
  );
};

export default withProtectedRoute(authUser => !!authUser)(Profile);
