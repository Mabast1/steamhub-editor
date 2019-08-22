import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import PictureIcon from '@material-ui/icons/CropOriginal';
import VideoIcon from '@material-ui/icons/Slideshow';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/Delete';
import QuestionIcon from '@material-ui/icons/HelpOutline';

export default props => {
  const {
    isUploading,
    classes,
    inputState: { engage },
  } = props;
  return (
    <React.Fragment>
      <div className={classes.inputDivider}>
        <h2 className="input-title">Engage</h2>
        <Divider />
      </div>
      {engage &&
        engage.map((item, index) => (
          <div className={classes.inputGroup} key={item.id}>
            {index < engage.length - 1 ? (
              <RemoveIcon
                className={classes.removeBtn}
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to delete this field?',
                    )
                  ) {
                    props.handleRemoveInput('engage', index);
                  }
                }}
              />
            ) : (
              <AddIcon
                onClick={() =>
                  props.handleAddInput('engage', {
                    text: '',
                    media: {
                      type: '',
                      url: '',
                    },
                  })
                }
              />
            )}

            <div>
              <TextField
                className={classes.textbox}
                value={engage[index].text}
                onChange={e =>
                  props.handleMultiInputChange('engage', {
                    index,
                    field: 'text',
                    value: e.target.value,
                    nested: false,
                  })
                }
                variant="outlined"
                margin="dense"
                label={`Engage ${index + 1}`}
                type="text"
                multiline
                fullWidth
              />

              {engage[index].media.type && (
                <div className={classes.mediaUrl}>
                  <TextField
                    value={engage[index].media.url}
                    onChange={e =>
                      props.handleMultiInputChange('engage', {
                        index,
                        field: 'url',
                        value: e.target.value,
                        nested: true,
                      })
                    }
                    variant="outlined"
                    margin="dense"
                    placeholder={
                      engage[index].media.type === 'ask'
                        ? 'Enter question'
                        : 'Paste url or browse from computer'
                    }
                    type="text"
                    fullWidth
                  />
                  {engage[index].media.type !== 'ask' && (
                    <Button
                      disabled={isUploading}
                      component="label"
                      variant="outlined"
                      color="primary"
                    >
                      {isUploading ? (
                        <CircularProgress size={14} thickness={4} />
                      ) : (
                        'Browse'
                      )}

                      <input
                        onChange={props.handleUploadMedia(index)}
                        type="file"
                        style={{ display: 'none' }}
                      />
                    </Button>
                  )}
                </div>
              )}

              <div className={classes.attachments}>
                <div
                  className={
                    engage[index].media.type === 'image'
                      ? classes.mediaTypeActive
                      : null
                  }
                  onClick={() =>
                    props.handleMultiInputChange('engage', {
                      index,
                      field: 'type',
                      value: 'image',
                      nested: true,
                    })
                  }
                >
                  <PictureIcon />
                </div>
                <div
                  className={
                    engage[index].media.type === 'video'
                      ? classes.mediaTypeActive
                      : null
                  }
                  onClick={() =>
                    props.handleMultiInputChange('engage', {
                      index,
                      field: 'type',
                      value: 'video',
                      nested: true,
                    })
                  }
                >
                  <VideoIcon />
                </div>
                <div
                  className={
                    engage[index].media.type === 'ask'
                      ? classes.mediaTypeActive
                      : null
                  }
                  onClick={() =>
                    props.handleMultiInputChange('engage', {
                      index,
                      field: 'type',
                      value: 'ask',
                      nested: true,
                    })
                  }
                >
                  <QuestionIcon />
                </div>
              </div>
            </div>
          </div>
        ))}
    </React.Fragment>
  );
};
