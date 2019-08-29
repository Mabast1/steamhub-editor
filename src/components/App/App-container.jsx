import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import App from './App';
import { setAuthUser } from '../../actions';
import { withFirebase } from '../Firebase';

const AppContainer = ({ setUser, firebase }) => {
  React.useEffect(() => {
    // Listen to user state changes to track if user is logged in or not
    const authUserListener = firebase.onAuthListener(
      authUser => {
        setUser(authUser);
      },
      () => {
        setUser(null);
      }
    );

    // Cleanup listener on component unmount to prevent memory leaks
    return () => {
      authUserListener();
    };
  }, [firebase, setUser]);

  return <App />;
};

// Redux action dispatchers
const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setAuthUser(user)),
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withFirebase
)(AppContainer);
