import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';

import styles from './contentCog-styles';

export default withStyles(styles)(
  ({
    classes,
    inputState: { skills, url },
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
          <p>{url && url !== '' ? url : 'Upload media (Max. 5 MB)'}</p>
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
  }
);
