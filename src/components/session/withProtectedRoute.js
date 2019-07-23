import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../firebase';

const mapStateToProps = state => ({
  authUser: state.authUser
});

export default condition => Component =>
  compose(
    connect(mapStateToProps),
    withRouter,
    withFirebase
  )(props => {
    React.useEffect(() => {
      let listener = props.firebase.onAuthListener(
        authUser => {
          if (!condition(authUser)) {
            props.history.push(ROUTES.SIGNIN);
          }
        },
        () => props.history.push(ROUTES.SIGNIN)
      );

      return () => {
        listener();
      };
    }, []);

    return (
      <React.Fragment>
        {condition(props.authUser) ? (
          <Component {...props} />
        ) : (
          // TODO: Add some sort of loading screen.
          <div>Loading...</div>
        )}
      </React.Fragment>
    );
  });
