import React from 'react';

import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';

import UploadButton from './uploadBtn';

export default ({
  classes,
  firebase,
  gradeLevels,
  inputState: { name, descr, subject, grade, rwc, skills },
  handleInputChange,
  handleMultiInputChange,
  handleAddInput,
  handleRemoveInput
}) => {
  React.useEffect(() => {
    handleAddInput('skills');
  }, []);

  return (
    <React.Fragment>
      <TextField
        name='name'
        value={name ? name : ''}
        onChange={e => handleInputChange(e.target.name, e.target.value)}
        variant='outlined'
        margin='dense'
        placeholder='COG name'
        type='text'
        fullWidth
      />
      <div className={classes.modalUpload}>
        <UploadButton
          firebase={firebase}
          handleInputChange={handleInputChange}
        />
      </div>

      <div className={classes.modalDivider}>
        Overview <Divider />
      </div>
      <TextField
        name='descr'
        value={descr ? descr : ''}
        onChange={e => handleInputChange(e.target.name, e.target.value)}
        variant='outlined'
        margin='dense'
        placeholder='Overview'
        type='text'
        multiline
        fullWidth
      />

      <div className={classes.modalDivider}>
        Subject <Divider />
      </div>
      <Select
        className={classes.dropDown}
        style={!subject ? { color: 'rgba(0, 0, 0, 0.4)' } : null}
        value={subject ? subject : ''}
        onChange={e => handleInputChange(e.target.name, e.target.value)}
        margin='dense'
        displayEmpty
        fullWidth
        input={<OutlinedInput name='subject' />}
      >
        <MenuItem value='' disabled>
          Select subject
        </MenuItem>
        <MenuItem value='All'>N/A</MenuItem>
        <MenuItem value='3D Printing'>3D Printing</MenuItem>
        <MenuItem value='Coding'>Coding & Programming</MenuItem>
        <MenuItem value='Culinary'>Culinary Art</MenuItem>
        <MenuItem value='Engineering'>Design Based Engineering</MenuItem>
        <MenuItem value='Drone'>Drone Engineering</MenuItem>
        <MenuItem value='Entrepreneur'>Entrepreneurship</MenuItem>
        <MenuItem value='Science'>Investigative Science Lab</MenuItem>
        <MenuItem value='Maker Studio'>Maker Studio</MenuItem>
        <MenuItem value='Mental Math'>Mental Math</MenuItem>
        <MenuItem value='Minecraft'>Minecraft</MenuItem>
        <MenuItem value='Movie Studio'>Movie Studio</MenuItem>
        <MenuItem value='Robotics'>Robotics</MenuItem>
        <MenuItem value='Visual Art'>Visual Art Studio</MenuItem>
      </Select>

      <div className={classes.modalDivider}>
        Grade Level <Divider />
      </div>
      <Select
        className={classes.dropDown}
        style={!grade ? { color: 'rgba(0, 0, 0, 0.4)' } : null}
        value={grade ? grade : ''}
        onChange={e => handleInputChange(e.target.name, e.target.value)}
        margin='dense'
        displayEmpty
        fullWidth
        input={<OutlinedInput name='grade' />}
      >
        {gradeLevels.map((item, index) => (
          <MenuItem key={index} disabled={index === 0} value={item.value}>
            {item.text}
          </MenuItem>
        ))}
      </Select>

      <div className={classes.modalDivider}>
        Real World Connections <Divider />
      </div>
      <TextField
        name='rwc'
        value={rwc ? rwc : ''}
        onChange={e => handleInputChange(e.target.name, e.target.value)}
        variant='outlined'
        margin='dense'
        placeholder='Real world connections'
        type='text'
        multiline
        fullWidth
      />

      <div className={classes.modalDivider}>
        Skills Gained <Divider />
      </div>
      {skills &&
        skills.map((skill, index) => {
          return (
            <div key={skill.id} className={classes.skills}>
              {index < skills.length - 1 ? (
                <RemoveIcon
                  className={classes.removeBtn}
                  fontSize='small'
                  onClick={() => handleRemoveInput('skills', index)}
                />
              ) : (
                <AddIcon
                  fontSize='small'
                  onClick={() => handleAddInput('skills')}
                />
              )}
              <TextField
                value={skills[index] ? skills[index].text : ''}
                onChange={e =>
                  handleMultiInputChange('skills', {
                    index,
                    item: e.target.value
                  })
                }
                variant='outlined'
                margin='dense'
                placeholder='Skills'
                type='text'
                fullWidth
              />
            </div>
          );
        })}
    </React.Fragment>
  );
};
