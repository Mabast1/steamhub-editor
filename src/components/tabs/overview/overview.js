import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import useStyles from './overview-styles';

export default props => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    subject: ''
  });
  const [inputCount, setInputCount] = React.useState({
    standards: 1,
    vocab: 1,
    teacher: 1,
    student: 1,
    group: 1
  });

  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  }

  function handleAddInput(input) {
    setInputCount(prev => ({
      ...prev,
      [input]: prev[input] + 1
    }));
  }

  function displayStandards() {
    let standards = [];
    for (let i = 0; i < inputCount['standards']; i++) {
      standards.push(
        <TextField
          key={i}
          placeholder='Enter standard description'
          multiline
          className={classes.textField}
        />
      );
    }
    return standards;
  }

  return (
    <React.Fragment>
      <section>
        <div className={classes.center}>
          <div className='flex-2'>
            <h2>Select Subject</h2>
            <FormControl>
              <Select
                className={classes.selectRoot}
                value={values.subject}
                onChange={handleChange}
                name='subject'
              >
                {/* TODO: Add subjects */}
                <MenuItem value='10'>Ten</MenuItem>
                <MenuItem value='20'>Twenty</MenuItem>
                <MenuItem value='30'>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className='flex-2'>
            <h2>Upload Module Picture</h2>
            <Button
              disabled
              variant='contained'
              className={classes.browseBtnRoot}
            >
              Browse
            </Button>
          </div>
        </div>
      </section>

      <section className={classes.section}>
        <div className={classes.center} style={{ flexDirection: 'column' }}>
          <h2>Module Name</h2>
          <InputBase
            defaultValue=''
            placeholder='Enter module name'
            inputProps={{ 'aria-label': 'module name' }}
          />

          <h2>Module Description</h2>
          <TextField
            placeholder='Enter module description'
            multiline
            className={classes.textField}
          />
        </div>
      </section>

      <section>
        <div className={classes.center} style={{ flexDirection: 'column' }}>
          <h2>Standards</h2>
          {displayStandards()}
          {/* <TextField
            placeholder='Enter standard description'
            multiline
            className={classes.textField}
          /> */}
          <button onClick={() => handleAddInput('standards')}>
            Add Standards
          </button>

          <h2>Vocabularies</h2>
          <TextField
            placeholder='Enter vocabulary definition'
            multiline
            className={classes.textField}
          />
        </div>
      </section>
    </React.Fragment>
  );
};
