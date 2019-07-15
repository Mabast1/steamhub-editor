import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default () => {
  let numbers = [];
  for (let i = 1; i <= 15; i++) numbers.push(i);
  const [values, setValues] = React.useState(0);

  function handleChange(event) {
    setValues(event.target.value);
  }

  return (
    <FormControl>
      <Select id='module-num' value={values} onChange={handleChange}>
        {numbers.map(n => (
          <MenuItem key={n} value={n}>
            {n}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
