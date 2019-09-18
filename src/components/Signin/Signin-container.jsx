import React from 'react';

import Signin from './Signin';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

const SigninContainer = ({ firebase, history }) => {
  const INITIAL_STATE = {
    email: '',
    password: '',
    hidePassword: true,
    error: null,
  };
  const [state, setState] = React.useState(INITIAL_STATE);

  // #region Event handlers
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
  // #endregion Event handlers

  return (
    <Signin
      state={state}
      handleLogin={handleLogin}
      handleInputChange={handleInputChange}
      toggleHidePassword={toggleHidePassword}
    />
  );
};

export default withFirebase(SigninContainer);
