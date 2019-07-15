import React from 'react';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
// import useStyles from './stepsForm-styles';
import UploadButton from '../../uploadBtn';

export default () => {
  let components = [];
  // const classes = useStyles();
  const [count, setCount] = React.useState(1);

  function handleAddInput() {
    setCount(prev => prev + 1);
  }

  for (let i = 0; i < count; i++) {
    components.push(
      <React.Fragment key={`step-${i}`}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {i === count - 1 ? (
            <AddIcon onClick={handleAddInput} style={{ cursor: 'pointer' }} />
          ) : (
            <span style={{ width: '25px' }} />
          )}

          <TextField
            id={`step-${i}`}
            placeholder='Enter step-by-step instruction'
            multiline
            style={{ marginLeft: '8px', width: '100%' }}
          />
        </div>
        <TextField
          id={`step-ask-${i}`}
          placeholder='(Optional) Ask/Freeze Frame'
          multiline
          style={{
            marginTop: '16px',
            marginBottom: '24px',
            marginLeft: '32px'
          }}
        />
        <UploadButton id={`step-pic-${i}`} />
        <p
          style={{
            marginTop: '6px',
            marginBottom: '40px',
            color: 'rgba(112,112,112,0.45)',
            fontSize: '12px'
          }}
        >
          (Optional) upload max 1 media up to 5 MB
        </p>
      </React.Fragment>
    );
  }
  return components;
};
