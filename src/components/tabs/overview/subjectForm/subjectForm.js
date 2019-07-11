import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useStyles from './subjectForm-styles';

export default () => {
  const classes = useStyles();
  const [subject, setSubject] = React.useState('');

  function handleChange(event) {
    setSubject(event.target.value);
  }

  return (
    <FormControl>
      <Select
        id='cog-subject'
        className={classes.selectRoot}
        value={subject}
        onChange={handleChange}
        name='subject'
      >
        {/* TODO: Add subjects */}
        <MenuItem value='10'>Ten</MenuItem>
        <MenuItem value='20'>Twenty</MenuItem>
        <MenuItem value='30'>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};
