import {
  GET_CURRENT_FOLDER,
  RESET_CURRENT_FOLDER
} from '../../constants/redux';

export const getCurrentFolderInfo = collection => dispatch => {
  return collection()
    .get()
    .then(doc => {
      dispatch({
        type: GET_CURRENT_FOLDER,
        payload: doc.data()
      });
    });
};

export const resetCurrentFolderInfo = () => ({
  type: RESET_CURRENT_FOLDER
});
