import React from 'react';

import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import useStyles from './overview-styles';
import SubjectForm from './subjectForm';
import UploadButton from '../uploadBtn';
import StandardForm from './standardForm';
import VocabForm from './vocabForm';
import MaterialsForm from './materialsForm';

export default props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <section>
        <div className={classes.center}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className='flex-2'>
              <h2>Subject</h2>
              <SubjectForm />
            </div>

            <div className='flex-2'>
              <h2>COG Name</h2>
              <TextField placeholder='Enter COG name' multiline />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className='flex-2'>
              <h2>Grade Level</h2>
              <SubjectForm />
            </div>

            <div className='flex-2'>
              <h2>Module Picture</h2>
              <UploadButton />
            </div>
          </div>
        </div>
      </section>

      <section className={classes.section}>
        <div className={classes.center}>
          <h2>Module Name</h2>
          <InputBase
            className={classes.moduleName}
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
        <div className={classes.center}>
          <h2>Standards</h2>
          <StandardForm />

          <h2>Vocabularies</h2>
          <VocabForm />

          <h2 style={{ marginBottom: '6px' }}>Materials</h2>
          <MaterialsForm />
        </div>
      </section>
    </React.Fragment>
  );
};
