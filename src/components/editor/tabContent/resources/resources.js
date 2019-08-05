import React from 'react';

import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/Delete';

export default props => {
  const {
    classes,
    inputState: { standards, vocab, prep }
  } = props;

  return (
    <React.Fragment>
      <div className={classes.inputDivider}>
        <h2 className='input-title'>Standards</h2>
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
                      'Are you sure you want to delete this field?'
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
                    stdDesc: ''
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
                  value: e.target.value
                })
              }
              variant='outlined'
              margin='dense'
              placeholder='Enter code'
              type='text'
            />

            <TextField
              value={standards[index] ? standards[index].stdDesc : ''}
              onChange={e =>
                props.handleMultiInputChange('standards', {
                  index,
                  field: 'stdDesc',
                  value: e.target.value
                })
              }
              variant='outlined'
              margin='dense'
              placeholder='Enter description'
              type='text'
              multiline
            />
          </div>
        ))}

      <div className={classes.inputDivider} style={{ marginTop: 72 }}>
        <h2 className='input-title'>Vocabulary</h2>
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
                      'Are you sure you want to delete this field?'
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
                  value: e.target.value
                })
              }
              variant='outlined'
              margin='dense'
              placeholder='Enter vocabulary'
              type='text'
            />

            <TextField
              value={vocab[index] ? vocab[index].vocabDef : ''}
              onChange={e =>
                props.handleMultiInputChange('vocab', {
                  index,
                  field: 'vocabDef',
                  value: e.target.value
                })
              }
              variant='outlined'
              margin='dense'
              placeholder='Enter definition'
              type='text'
              multiline
            />
          </div>
        ))}

      <div className={classes.inputDivider} style={{ marginTop: 72 }}>
        <h2 className='input-title'>Preparation Notes</h2>
        <Divider />
      </div>
      <TextField
        className={classes.textbox}
        value={prep ? prep : ''}
        onChange={e => props.handleInputState('prep', e.target.value)}
        variant='outlined'
        margin='dense'
        placeholder='Enter preparation notes'
        type='text'
        multiline
        fullWidth
      />
    </React.Fragment>
  );
};
