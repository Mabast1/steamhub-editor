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
    inputState: { engage }
  } = props;

  return (
    <React.Fragment>
      <div className={classes.inputDivider}>
        <h2 className='input-title'>Engage</h2>
        <Divider />
      </div>
      <TextField
        className={classes.textbox}
        value={engage.text}
        onChange={e => props.handleText('engage', 'text', e.target.value)}
        variant='outlined'
        margin='dense'
        placeholder='Enter class engagement strategies'
        type='text'
        multiline
        fullWidth
      />

      {engage.media.type && (
        <div className={classes.mediaUrl}>
          <TextField
            value={engage.media.url}
            onChange={e =>
              props.handleMedia('engage', 'media', 'url', e.target.value)
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
            engage.media.type === 'image' ? classes.mediaTypeActive : null
          }
          onClick={() => props.handleMedia('engage', 'media', 'type', 'image')}
        >
          <PictureIcon fontSize='large' />
          <p>Insert Image</p>
        </div>
        <div
          className={
            engage.media.type === 'video' ? classes.mediaTypeActive : null
          }
          onClick={() => props.handleMedia('engage', 'media', 'type', 'video')}
        >
          <VideoIcon fontSize='large' />
          <p>Insert Video</p>
        </div>
      </div>
    </React.Fragment>
  );
};
