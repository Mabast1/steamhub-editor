import { SET_AUTH_USER } from '../../constants/redux';

export const setAuthUser = authUser => ({
  type: SET_AUTH_USER,
  payload: authUser
});
