import React from 'react';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import useStyles from './materialsInput-styles';

export default ({ input }) => {
  let components = [];
  const classes = useStyles();
  const [count, setCount] = React.useState(1);

  function handleAddInput() {
    setCount(prev => prev + 1);
  }

  for (let i = 0; i < count; i++) {
    components.push(
      <div key={`${input}-${i}`} style={{ display: 'flex', alignItems: 'center' }}>
        {i === count - 1 ? (
          <AddIcon onClick={handleAddInput} />
        ) : (
          <span style={{ width: '24px' }} />
        )}

        <TextField
          id={`${input}-item-${i}`}
          placeholder='Enter item'
          multiline
          className={classes.inputName}
        />

        <TextField
          id={`${input}-quantity-${i}`}
          placeholder='Enter quantity'
          multiline
          className={classes.inputQuantity}
        />

        <TextField
          id={`${input}-notes-${i}`}
          placeholder='Enter item notes'
          multiline
          className={classes.inputNotes}
        />
      </div>
    );
  }
  return components;
};
