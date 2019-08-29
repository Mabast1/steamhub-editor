import { GET_CURRENT_FOLDER, RESET_CURRENT_FOLDER } from '../constants/redux';

export const getCurrentFolderInfo = collection => dispatch => {
  return collection()
    .get()
    .then(doc => {
      if (doc.exists) {
        dispatch({
          type: GET_CURRENT_FOLDER,
          payload: { ...doc.data(), id: doc.id },
        });
      } else {
        throw new Error('Document not found.');
      }
    })
    .catch(() => {
      dispatch({
        type: RESET_CURRENT_FOLDER,
      });
    });
};

export const resetCurrentFolderInfo = () => ({
  type: RESET_CURRENT_FOLDER,
});
