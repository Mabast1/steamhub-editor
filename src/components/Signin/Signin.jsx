import React from 'react';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import KeyIcon from '@material-ui/icons/VpnKey';
import EyeIcon from '@material-ui/icons/RemoveRedEye';
import WarningIcon from '@material-ui/icons/Warning';

export default ({ state, classes, handleLogin, handleInputChange, toggleHidePassword }) => {
  // Form input validation
  const isInvalid = state.password === '' || state.email === '';

  return (
    <div className={classes.signinContainer}>
      <form className={classes.signinForm} onSubmit={handleLogin}>
        <Paper className={classes.signinInput} elevation={0}>
          <PersonIcon />
          <Divider />
          <InputBase
            placeholder="Email Address"
            inputProps={{ 'aria-label': 'Email Address' }}
            name="email"
            type="email"
            autoComplete="off"
            onChange={handleInputChange}
          />
        </Paper>
        <Paper className={classes.signinInput} elevation={0}>
          <KeyIcon />
          <Divider />
          <InputBase
            placeholder="Password"
            inputProps={{ 'aria-label': 'Password' }}
            name="password"
            type={state.hidePassword ? 'password' : 'text'}
            onChange={handleInputChange}
          />
          <EyeIcon className={classes.inputEyeIcon} onClick={toggleHidePassword} fontSize="small" />
        </Paper>

        {state.error && (
          <div className={classes.signinError}>
            <WarningIcon fontSize="small" />
            <p>Invalid email or password.</p>
          </div>
        )}

        <div className={classes.signinAction}>
          <p>Forgot Password?</p>
          <Button
            className={classes.signinBtn}
            disabled={isInvalid}
            variant="contained"
            type="submit"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};
