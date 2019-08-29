import { SET_AUTH_USER } from '../constants/redux';

export default authUser => ({
  type: SET_AUTH_USER,
  payload: authUser,
});
