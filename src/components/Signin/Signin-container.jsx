import React from 'react';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import styles from './Signin-styles';
import Signin from './Signin';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

const SigninContainer = ({ classes, firebase, history }) => {
  // React hooks
  const INITIAL_STATE = {
    email: '',
    password: '',
    hidePassword: true,
    error: null,
  };
  const [state, setState] = React.useState(INITIAL_STATE);

  // Event handlers
  const handleLogin = event => {
    const { email, password } = state;

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setState({ ...INITIAL_STATE });
        history.push(ROUTES.DASHBOARD);
      })
      .catch(error => setState({ ...state, error }));

    event.preventDefault();
  };

  const handleInputChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const toggleHidePassword = () => {
    setState(prevState => ({
      ...prevState,
      hidePassword: !prevState.hidePassword,
    }));
  };

  return (
    <Signin
      state={state}
      classes={classes}
      handleLogin={handleLogin}
      handleInputChange={handleInputChange}
      toggleHidePassword={toggleHidePassword}
    />
  );
};

export default compose(
  withFirebase,
  withStyles(styles)
)(SigninContainer);
