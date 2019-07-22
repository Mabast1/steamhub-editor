import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import Signin from './signin';

import styles from './signin-styles';
import { withFirebase } from '../firebase';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
  email: '',
  password: '',
  hidePassword: true,
  error: null
};

export default compose(
  withRouter,
  withFirebase,
  withStyles(styles)
)(props => {
  const [state, setState] = React.useState(INITIAL_STATE);

  const onSubmit = event => {
    const { email, password } = state;

    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setState({ ...INITIAL_STATE });
        props.history.push(ROUTES.HOME);
      })
      .catch(error => setState({ ...state, error }));

    event.preventDefault();
  };

  const onChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const toggleHidePassword = () => {
    setState(prevState => ({
      ...prevState,
      hidePassword: !prevState.hidePassword
    }));
  };

  return (
    <Signin
      classes={props.classes}
      state={state}
      onSubmit={onSubmit}
      onChange={onChange}
      toggleHidePassword={toggleHidePassword}
    />
  );
});
