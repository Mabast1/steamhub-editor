import {
  GET_CURRENT_FOLDER,
  RESET_CURRENT_FOLDER
} from '../../constants/redux';

export const getCurrentFolderInfo = collection => dispatch => {
  return collection()
    .get()
    .then(doc => {
      if (doc.exists) {
        dispatch({
          type: GET_CURRENT_FOLDER,
          payload: doc.data()
        });
      } else {
        throw new Error('Document not found.');
      }
    })
    .catch(err => {
      dispatch({
        type: RESET_CURRENT_FOLDER
      });
    });
};

export const resetCurrentFolderInfo = () => ({
  type: RESET_CURRENT_FOLDER
});
