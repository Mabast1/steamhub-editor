import React from 'react';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import useStyles from './standardForm-styles';

export default () => {
  let standards = [];
  const classes = useStyles();
  const [count, setCount] = React.useState(1);

  function handleAddInput() {
    setCount(prev => prev + 1);
  }

  for (let i = 0; i < count; i++) {
    standards.push(
      <div key={`std-${i}`} style={{ display: 'flex', alignItems: 'center' }}>
        {i === count - 1 ? (
          <AddIcon onClick={handleAddInput} />
        ) : (
          <span style={{ width: '32px' }} />
        )}

        <TextField
          id={`std-code-${i}`}
          placeholder='Enter standard code'
          multiline
          className={classes.stdCode}
        />

        <TextField
          id={`std-desc-${i}`}
          placeholder='Enter standard description'
          multiline
          className={classes.stdDesc}
        />
      </div>
    );
  }
  return standards;
};
