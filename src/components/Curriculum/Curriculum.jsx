import React from 'react';

import Layout from '../Layout';
import withProtectedRoute from '../ProtectedRoute';

const Curriculum = () => {
  return (
    <Layout>
      <h1 style={{ margin: 0 }}>Curriculum</h1>
    </Layout>
  );
};

export default withProtectedRoute(authUser => !!authUser)(Curriculum);
