import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';

export default ({
  classes,
  inputState: { skills, url, isUploading, uploadProgress },
  handleUploadMedia,
  handleInputChange,
  handleMultiInputChange,
  handleAddInput,
  handleRemoveInput
}) => {
  React.useEffect(() => {
    handleAddInput('skills');
  }, []);

  return (
    <React.Fragment>
      <TextField
        name='name'
        onChange={handleInputChange}
        variant='outlined'
        margin='dense'
        label='COG Name'
        type='text'
        fullWidth
      />
      <div className={classes.modalUpload}>
        <Button component='label' variant='outlined' color='primary'>
          Browse
          <input
            onChange={handleUploadMedia}
            type='file'
            style={{ display: 'none' }}
          />
        </Button>
        {isUploading && uploadProgress ? (
          <p>{`Uploading... (${Math.round(uploadProgress * 100) / 100}%)`}</p>
        ) : url && url !== '' ? (
          <p className='success-msg'>File uploaded</p>
        ) : (
          <p>Upload media (Max. 5 MB)</p>
        )}
        {isUploading && <CircularProgress size={16} thickness={4} />}
      </div>

      <div className={classes.modalDivider}>
        Overview <Divider />
      </div>
      <TextField
        name='descr'
        onChange={handleInputChange}
        variant='outlined'
        margin='dense'
        placeholder='Overview'
        type='text'
        multiline
        fullWidth
      />

      <div className={classes.modalDivider}>
        Real World Connections <Divider />
      </div>
      <TextField
        name='rwc'
        onChange={handleInputChange}
        variant='outlined'
        margin='dense'
        placeholder='Real World Connections'
        type='text'
        multiline
        fullWidth
      />

      <div className={classes.modalDivider}>
        Skills Gained <Divider />
      </div>
      {skills &&
        skills.map((skill, index) => {
          return (
            <div key={skill.id} className={classes.skills}>
              {index < skills.length - 1 ? (
                <RemoveIcon
                  className={classes.removeBtn}
                  fontSize='small'
                  onClick={() => handleRemoveInput('skills', index)}
                />
              ) : (
                <AddIcon
                  fontSize='small'
                  onClick={() => handleAddInput('skills')}
                />
              )}
              <TextField
                onChange={e =>
                  handleMultiInputChange('skills', {
                    index,
                    item: e.target.value
                  })
                }
                variant='outlined'
                margin='dense'
                placeholder='Skills'
                type='text'
                fullWidth
              />
            </div>
          );
        })}
    </React.Fragment>
  );
};
