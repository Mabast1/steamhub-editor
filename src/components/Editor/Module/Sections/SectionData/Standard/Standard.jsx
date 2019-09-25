import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import HandleIcon from '@material-ui/icons/DragHandle';

const useStyles = makeStyles(theme => ({
  left: {
    width: 180,
    [theme.breakpoints.up('lg')]: {
      width: 240,
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
        className={classes.left}
        value={entry.stdCode ? entry.stdCode : ''}
        onChange={e => handleDataChange(index, 'stdCode', e.target.value)}
        label="Code"
        variant="outlined"
        margin="dense"
        inputProps={{ 'aria-label': 'Standard code' }}
      />

      <TextField
        value={entry.stdDesc ? entry.stdDesc : ''}
        onChange={e => handleDataChange(index, 'stdDesc', e.target.value)}
        label="Description"
        variant="outlined"
        margin="dense"
        inputProps={{ 'aria-label': 'Standard description' }}
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
