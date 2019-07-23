import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import styles from './app-styles';
import App from './app';

import { setAuthUser } from '../../redux/actions';
import { withFirebase } from '../firebase';

const mapDispatchToProps = dispatch => ({
  setAuthUser: authUser => dispatch(setAuthUser(authUser))
});

export default compose(
  connect(null, mapDispatchToProps),
  withFirebase,
  withStyles(styles)
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

  return <App classes={props.classes} />;
});
