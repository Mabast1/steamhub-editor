import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/Delete';

export default props => {
  const {
    classes,
    inputState: { evaluate }
  } = props;
  const options = ['A', 'B', 'C', 'D'];

  return (
    <React.Fragment>
      <div className={classes.inputDivider}>
        <h2 className='input-title'>Evaluate</h2>
        <Divider />
      </div>
      {evaluate &&
        evaluate.map((item, index) => (
          <div key={item.id} className={classes.multiInputGroup}>
            <div className={classes.questionInput}>
              {index < evaluate.length - 1 ? (
                <RemoveIcon
                  className={classes.removeBtn}
                  onClick={() => {
                    if (
                      window.confirm(
                        'Are you sure you want to delete this field?'
                      )
                    ) {
                      props.handleRemoveInput('evaluate', index);
                    }
                  }}
                />
              ) : (
                <AddIcon
                  onClick={() =>
                    props.handleAddInput('evaluate', {
                      answer: '',
                      optionA: '',
                      optionB: '',
                      optionC: '',
                      optionD: '',
                      question: ''
                    })
                  }
                />
              )}

              <TextField
                value={evaluate[index].question}
                onChange={e =>
                  props.handleMultiInputChange('evaluate', {
                    index,
                    field: 'question',
                    value: e.target.value
                  })
                }
                variant='outlined'
                margin='dense'
                label={`Question ${index + 1}`}
                type='text'
                multiline
                fullWidth
              />
            </div>

            <div>
              <RadioGroup
                value={evaluate[index].answer}
                onChange={e =>
                  props.handleMultiInputChange('evaluate', {
                    index,
                    field: 'answer',
                    value: e.target.value
                  })
                }
              >
                {options.map(item => (
                  <div key={item} className={classes.optionInput}>
                    <Radio value={item} />
                    <TextField
                      value={evaluate[index][`option${item}`]}
                      onChange={e =>
                        props.handleMultiInputChange('evaluate', {
                          index,
                          field: `option${item}`,
                          value: e.target.value
                        })
                      }
                      variant='outlined'
                      margin='dense'
                      placeholder={`Option ${item}`}
                      type='text'
                      multiline
                      fullWidth
                    />
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        ))}

      <Button
        className={classes.publishModule}
        onClick={props.onPublishModule}
        variant='contained'
        color='primary'
      >
        Publish
      </Button>
    </React.Fragment>
  );
};
