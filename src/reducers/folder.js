import { GET_CURRENT_FOLDER, RESET_CURRENT_FOLDER } from '../constants/redux';

export default (state = null, action) => {
  switch (action.type) {
    case GET_CURRENT_FOLDER:
      return action.payload;
    case RESET_CURRENT_FOLDER:
      return {};
    default:
      return state;
  }
};
