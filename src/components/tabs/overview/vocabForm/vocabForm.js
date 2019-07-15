import React from 'react';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import useStyles from './vocabForm-styles';

export default () => {
  let vocabs = [];
  const classes = useStyles();
  const [count, setCount] = React.useState(1);

  function handleAddInput() {
    setCount(prev => prev + 1);
  }

  for (let i = 0; i < count; i++) {
    vocabs.push(
      <div key={`vocab-${i}`} style={{ display: 'flex', alignItems: 'center' }}>
        {i === count - 1 ? (
          <AddIcon onClick={handleAddInput} style={{ cursor: 'pointer' }} />
        ) : (
          <span style={{ width: '32px' }} />
        )}

        <TextField
          id={`vocab-${i}`}
          placeholder='Enter vocabulary'
          multiline
          className={classes.vocab}
        />

        <TextField
          id={`vocab-definition-${i}`}
          placeholder='Enter vocabulary definition'
          multiline
          className={classes.vocabDef}
        />
      </div>
    );
  }
  return vocabs;
};
