import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import PictureIcon from '@material-ui/icons/CropOriginal';
import VideoIcon from '@material-ui/icons/Slideshow';

export default props => {
  const {
    classes,
    isUploading,
    inputState: { explain }
  } = props;

  return (
    <React.Fragment>
      <div className={classes.inputDivider}>
        <h2 className='input-title'>Explain</h2>
        <Divider />
      </div>
      <TextField
        className={classes.textbox}
        value={explain.text}
        onChange={e => props.handleText('explain', 'text', e.target.value)}
        variant='outlined'
        margin='dense'
        placeholder='Enter expected results, learning experiences, etc.'
        type='text'
        multiline
        fullWidth
      />

      {explain.media.type && (
        <div className={classes.mediaUrl}>
          <TextField
            value={explain.media.url}
            onChange={e =>
              props.handleMedia('explain', 'media', 'url', e.target.value)
            }
            variant='outlined'
            margin='dense'
            placeholder='Paste url or browse from computer'
            type='text'
            fullWidth
          />
          <Button
            disabled={isUploading}
            component='label'
            variant='outlined'
            color='primary'
          >
            {isUploading ? (
              <CircularProgress size={14} thickness={4} />
            ) : (
              'Browse'
            )}

            <input
              onChange={props.handleUploadMedia}
              type='file'
              style={{ display: 'none' }}
            />
          </Button>
        </div>
      )}

      <div className={classes.attachments}>
        <div
          className={
            explain.media.type === 'image' ? classes.mediaTypeActive : null
          }
          onClick={() => props.handleMedia('explain', 'media', 'type', 'image')}
        >
          <PictureIcon fontSize='large' />
          <p>Insert Image</p>
        </div>
        <div
          className={
            explain.media.type === 'video' ? classes.mediaTypeActive : null
          }
          onClick={() => props.handleMedia('explain', 'media', 'type', 'video')}
        >
          <VideoIcon fontSize='large' />
          <p>Insert Video</p>
        </div>
      </div>
    </React.Fragment>
  );
};
