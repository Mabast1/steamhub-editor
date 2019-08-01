import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import App from './app';

import { setAuthUser } from '../../redux/actions';
import { withFirebase } from '../firebase';

const mapDispatchToProps = dispatch => ({
  setAuthUser: authUser => dispatch(setAuthUser(authUser))
});

export default compose(
  connect(null, mapDispatchToProps),
  withFirebase
)(props => {
  React.useEffect(() => {
    let listener = props.firebase.onAuthListener(
      authUser => {
        props.setAuthUser(authUser);
      },
      () => {
        props.setAuthUser(null);
      }
    );

    return () => {
      listener();
    };
  }, []);

  return <App />;
});
