import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

// Redux state management
const mapStateToProps = state => ({
  authUser: state.authUser,
});

export default condition => Component =>
  compose(
    connect(mapStateToProps),
    withFirebase
  )(({ firebase, authUser, history, match, location }) => {
    React.useEffect(() => {
      // Listen to user state changes to track if user authorized or not to see the page
      const authUserListener = firebase.onAuthListener(
        user => {
          if (!condition(user)) {
            history.push(ROUTES.SIGNIN);
          }
        },
        () => history.push(ROUTES.SIGNIN)
      );

      // Cleanup listener on component unmount to prevent memory leaks
      return () => {
        authUserListener();
      };
    }, [firebase, history]);

    return (
      <>
        {condition(authUser) ? (
          <Component history={history} match={match} location={location} />
        ) : (
          <div>Loading...</div>
        )}
      </>
    );
  });
