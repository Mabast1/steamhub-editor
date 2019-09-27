import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    flexGrow: 1,
    '& .MuiSelect-root': {
      padding: '14px 16px',
    },
  },
}));

const NewSectionDialog = ({ handleClose, handleAddNewSection }) => {
  const classes = useStyles();
  const [type, setType] = React.useState('');

  const handleTypeChange = value => {
    setType(Number(value));
  };

  return (
    <>
      <DialogContent>
        <p className="dialog-title">Add New Section</p>
        <form className={classes.container}>
          <FormControl className={classes.formControl}>
            <Select
              value={type}
              onChange={e => handleTypeChange(e.target.value)}
              displayEmpty
              variant="outlined"
            >
              <MenuItem disabled value="">
                Select section type
              </MenuItem>
              <MenuItem value={0}>Standards</MenuItem>
              <MenuItem value={1}>Glossaries</MenuItem>
              <MenuItem value={2}>Materials</MenuItem>
              <MenuItem value={3}>Cards</MenuItem>
              <MenuItem value={4}>Expandables</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleAddNewSection(type);
            handleClose();
          }}
          disabled={type === ''}
          color="primary"
        >
          Ok
        </Button>
      </DialogActions>
    </>
  );
};

export default NewSectionDialog;
