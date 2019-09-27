import React from 'react';

// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import HandleIcon from '@material-ui/icons/DragHandle';

// const useStyles = makeStyles(theme => ({
//   left: {
//     width: 180,
//     [theme.breakpoints.up('lg')]: {
//       width: 240,
//     },
//   },
// }));

const Expandable = ({
  entry,
  index,
  length,
  handleDataChange,
  handleDeleteData,
  handleAddData,
  dragHandleProps,
}) => {
  // const classes = useStyles();

  return (
    <>
      <div className="move-handle" {...dragHandleProps}>
        <HandleIcon />
      </div>

      {/* <TextField
        className={classes.left}
        value={entry.vocab ? entry.vocab : ''}
        onChange={e => handleDataChange(index, 'vocab', e.target.value)}
        label="Word"
        variant="outlined"
        margin="dense"
        inputProps={{ 'aria-label': 'Word' }}
      /> */}

      <TextField
        value={entry.text ? entry.text : ''}
        onChange={e => handleDataChange(index, 'text', e.target.value)}
        label="Enter text"
        variant="outlined"
        margin="dense"
        inputProps={{ 'aria-label': 'Enter text' }}
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

export default Expandable;
