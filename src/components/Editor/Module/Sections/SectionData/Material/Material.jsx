import React from 'react';

import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import HandleIcon from '@material-ui/icons/DragHandle';

const Standard = ({
  entry,
  index,
  length,
  handleDataChange,
  handleDeleteData,
  handleAddData,
  dragHandleProps,
}) => (
  <>
    <div className="move-handle" {...dragHandleProps}>
      <HandleIcon />
    </div>

    <TextField
      value={entry.item ? entry.item : ''}
      onChange={e => handleDataChange(index, 'item', e.target.value)}
      label="Item name"
      variant="outlined"
      margin="dense"
      inputProps={{ 'aria-label': 'Item name' }}
      style={{ flexGrow: 1 }}
    />

    <TextField
      value={entry.quantity ? entry.quantity : ''}
      onChange={e => handleDataChange(index, 'quantity', e.target.value)}
      label="#"
      variant="outlined"
      margin="dense"
      type="number"
      InputProps={{ inputProps: { min: 1, 'aria-label': 'Item quantity' } }}
      style={{ width: 64 }}
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

export default Standard;
