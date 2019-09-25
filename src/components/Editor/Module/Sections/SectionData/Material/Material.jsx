import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import HandleIcon from '@material-ui/icons/DragHandle';

const useStyles = makeStyles(theme => ({
  itemInput: {
    flexGrow: 1,
    [theme.breakpoints.up('lg')]: {
      flexGrow: 0,
      width: 200,
    },
  },
}));

const Standard = ({
  entry,
  index,
  length,
  handleDataChange,
  handleDeleteData,
  handleAddData,
  dragHandleProps,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className="move-handle" {...dragHandleProps}>
        <HandleIcon />
      </div>

      <TextField
        className={classes.itemInput}
        value={entry.item ? entry.item : ''}
        onChange={e => handleDataChange(index, 'item', e.target.value)}
        label="Item name"
        variant="outlined"
        margin="dense"
        inputProps={{ 'aria-label': 'Item name' }}
      />

      <TextField
        value={entry.quantity ? entry.quantity : ''}
        onChange={e => handleDataChange(index, 'quantity', e.target.value)}
        label="#"
        variant="outlined"
        margin="dense"
        type="number"
        InputProps={{ inputProps: { min: 1, 'aria-label': 'Item quantity' } }}
        style={{ width: 70 }}
      />

      <TextField
        value={entry.note ? entry.note : ''}
        onChange={e => handleDataChange(index, 'note', e.target.value)}
        label="Note"
        variant="outlined"
        margin="dense"
        inputProps={{ 'aria-label': 'Item note' }}
        style={{ flexGrow: 1, marginRight: 8 }}
      />

      {index === length - 1 ? (
        <AddIcon className="add-icon" onClick={handleAddData} />
      ) : (
        <DeleteIcon className="delete-icon" onClick={() => handleDeleteData(entry.id)} />
      )}
    </>
  );
};

export default Standard;
