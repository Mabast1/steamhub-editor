import { SET_AUTH_USER } from '../constants/redux';

export default (state = null, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return action.payload;
    default:
      return state;
  }
};
