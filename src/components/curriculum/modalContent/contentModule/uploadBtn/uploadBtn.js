import React from 'react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export default ({ isUploading, uploadProgress, handleUploadMedia }) => {
  return (
    <React.Fragment>
      <Button component='label' variant='outlined' color='primary'>
        Browse
        <input
          onChange={handleUploadMedia}
          type='file'
          style={{ display: 'none' }}
        />
      </Button>
      {isUploading ? (
        <p>{`Uploading... (${Math.round(uploadProgress * 100) / 100}%)`}</p>
      ) : uploadProgress === 100 ? (
        <p className='success-msg'>File uploaded</p>
      ) : (
        <p>Upload media (Max. 5 MB)</p>
      )}
      {isUploading && <CircularProgress size={16} thickness={4} />}
    </React.Fragment>
  );
};
