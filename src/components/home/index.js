import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFirebase } from '../firebase';
import { withProtectedRoute } from '../session';

const mapStateToProps = state => ({
  authUser: state.authUser
});

export default compose(
  connect(mapStateToProps),
  withFirebase,
  withProtectedRoute(authUser => !!authUser)
)(props => {
  return (
    <div>
      <p>{props.authUser.email}</p>
      <button type='button' onClick={props.firebase.doSignOut}>
        Sign Out
      </button>
    </div>
  );
});
