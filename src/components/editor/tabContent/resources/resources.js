import React from 'react';

import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/Delete';

export default props => {
  const {
    classes,
    inputState: { standards, vocab, prep, resources },
  } = props;

  return (
    <React.Fragment>
      <div className={classes.inputDivider}>
        <h2 className="input-title">Standards</h2>
        <Divider />
      </div>
      {standards &&
        standards.map((item, index) => (
          <div key={item.id} className={classes.multiInputGroup}>
            {index < standards.length - 1 ? (
              <RemoveIcon
                className={classes.removeBtn}
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to delete this field?',
                    )
                  ) {
                    props.handleRemoveInput('standards', index);
                  }
                }}
              />
            ) : (
              <AddIcon
                onClick={() =>
                  props.handleAddInput('standards', {
                    stdCode: '',
                    stdDesc: '',
                  })
                }
              />
            )}

            <TextField
              value={standards[index] ? standards[index].stdCode : ''}
              onChange={e =>
                props.handleMultiInputChange('standards', {
                  index,
                  field: 'stdCode',
                  value: e.target.value,
                })
              }
              variant="outlined"
              margin="dense"
              placeholder="Enter code"
              type="text"
            />

            <TextField
              value={standards[index] ? standards[index].stdDesc : ''}
              onChange={e =>
                props.handleMultiInputChange('standards', {
                  index,
                  field: 'stdDesc',
                  value: e.target.value,
                })
              }
              variant="outlined"
              margin="dense"
              placeholder="Enter description"
              type="text"
              multiline
            />
          </div>
        ))}

      <div className={classes.inputDivider} style={{ marginTop: 72 }}>
        <h2 className="input-title">Vocabulary</h2>
        <Divider />
      </div>
      {vocab &&
        vocab.map((item, index) => (
          <div key={item.id} className={classes.multiInputGroup}>
            {index < vocab.length - 1 ? (
              <RemoveIcon
                className={classes.removeBtn}
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to delete this field?',
                    )
                  ) {
                    props.handleRemoveInput('vocab', index);
                  }
                }}
              />
            ) : (
              <AddIcon
                onClick={() =>
                  props.handleAddInput('vocab', { vocab: '', vocabDef: '' })
                }
              />
            )}

            <TextField
              value={vocab[index] ? vocab[index].vocab : ''}
              onChange={e =>
                props.handleMultiInputChange('vocab', {
                  index,
                  field: 'vocab',
                  value: e.target.value,
                })
              }
              variant="outlined"
              margin="dense"
              placeholder="Enter vocabulary"
              type="text"
            />

            <TextField
              value={vocab[index] ? vocab[index].vocabDef : ''}
              onChange={e =>
                props.handleMultiInputChange('vocab', {
                  index,
                  field: 'vocabDef',
                  value: e.target.value,
                })
              }
              variant="outlined"
              margin="dense"
              placeholder="Enter definition"
              type="text"
              multiline
            />
          </div>
        ))}

      <div className={classes.inputDivider} style={{ marginTop: 72 }}>
        <h2 className="input-title">Preparation Notes</h2>
        <Divider />
      </div>
      <TextField
        className={classes.textbox}
        value={prep ? prep : ''}
        onChange={e => props.handleInputState('prep', e.target.value)}
        variant="outlined"
        margin="dense"
        placeholder="Enter preparation notes"
        type="text"
        multiline
        fullWidth
      />

      <div className={classes.inputDivider}>
        <h2 className="input-title">Resources</h2>
        <Divider />
      </div>
      {resources &&
        resources.map((item, index) => (
          <div key={item.id} className={classes.multiInputGroup}>
            {index < resources.length - 1 ? (
              <RemoveIcon
                className={classes.removeBtn}
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to delete this field?',
                    )
                  ) {
                    props.handleRemoveInput('resources', index);
                  }
                }}
              />
            ) : (
              <AddIcon
                onClick={() =>
                  props.handleAddInput('resources', { name: '', url: '' })
                }
              />
            )}

            <TextField
              value={resources[index] ? resources[index].name : ''}
              onChange={e =>
                props.handleMultiInputChange('resources', {
                  index,
                  field: 'name',
                  value: e.target.value,
                })
              }
              variant="outlined"
              margin="dense"
              placeholder="Enter file name"
              type="text"
            />

            <TextField
              value={resources[index] ? resources[index].url : ''}
              onChange={e =>
                props.handleMultiInputChange('resources', {
                  index,
                  field: 'url',
                  value: e.target.value,
                })
              }
              variant="outlined"
              margin="dense"
              placeholder="Paste url or browse file"
              type="text"
            />
            <Button
                disabled={props.isUploading}
                component="label"
                variant="outlined"
                color="primary"
              >
                {props.isUploading ? (
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
          </div>
        ))}
    </React.Fragment>
  );
};
