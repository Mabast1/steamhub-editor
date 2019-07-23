import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Layout from '../layout';

import { withFirebase } from '../firebase';
import { withProtectedRoute } from '../session';

const mapStateToProps = state => ({
  authUser: state.authUser
});

// TODO: Create proper dashboard
export default compose(
  connect(mapStateToProps),
  withFirebase,
  withProtectedRoute(authUser => !!authUser)
)(props => {
  return (
    <Layout>
      <p>{props.authUser.email}</p>
      <button type='button' onClick={props.firebase.doSignOut}>
        Sign Out
      </button>
    </Layout>
  );
});
