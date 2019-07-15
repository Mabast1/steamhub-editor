import React from 'react';

import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import useStyles from './overview-styles';
import UploadButton from '../uploadBtn';
import StandardForm from './standardForm';
import VocabForm from './vocabForm';
import MaterialsForm from './materialsForm';
import ModuleNumber from './moduleNumberForm';

export default props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <section>
        <div className={classes.center}>
          <h2>COG Name</h2>
          <TextField id='cog-name' placeholder='Enter COG name' multiline />

          <h2>Module Number</h2>
          <ModuleNumber />

          <h2>Module Picture</h2>
          <UploadButton id='module-pic' />
        </div>
      </section>

      <section className={classes.section}>
        <div className={classes.center}>
          <h2>Module Name</h2>
          <InputBase
            id='module-name'
            className={classes.moduleName}
            defaultValue=''
            placeholder='Enter module name'
            inputProps={{ 'aria-label': 'module name' }}
          />

          <h2>Module Description</h2>
          <TextField
            id='module-desc'
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

          <h2>Preparation Notes</h2>
          <TextField
            id='prep-notes'
            placeholder='Enter preparation notes'
            multiline
          />

          <h2 style={{ marginBottom: '6px' }}>Materials</h2>
          <MaterialsForm />
        </div>
      </section>
    </React.Fragment>
  );
};
