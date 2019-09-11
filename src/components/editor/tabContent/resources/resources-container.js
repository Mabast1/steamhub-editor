import React from 'react';
import shortid from 'shortid';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import styles from './resources-styles';
import Resource from './resources';
import { withFirebase } from '../../../firebase';

export default compose(
  withFirebase,
  withStyles(styles)
)(props => {
  const { inputState, setInputState } = props;
  const [isUploading, setUploading] = React.useState(false);

  // TODO: Refactor multi-input handlers. Do Not Repeat Yourself!
  const handleMultiInputChange = (name, action) => {
    const newArray = inputState[name].map((item, index) => {
      if (index !== action.index) return item;

      return { ...item, [action.field]: action.value };
    });

    setInputState({ ...inputState, [name]: newArray });
  };

  const handleAddInput = (name, fields) => {
    let newArray;
    if (inputState[name] && inputState[name].length > 0) {
      newArray = [
        ...inputState[name].slice(0, inputState[name].length),
        { ...fields, id: shortid.generate() },
      ];
    } else {
      newArray = [{ ...fields, id: shortid.generate() }];
    }

    setInputState({ ...inputState, [name]: newArray });
  };

  const handleRemoveInput = (name, index) => {
    const newArray = [
      ...inputState[name].slice(0, index),
      ...inputState[name].slice(index + 1),
    ];

    setInputState({ ...inputState, [name]: newArray });
  };

  const handleUploadMedia = index => e => {
    const file = e.target.files[0];

    if (file && file.size < 5000000) {
      const uploadTask = props.firebase
        .storageRef('/module')
        .child(`${Date.now()}-${file.name}`)
        .put(file);

      uploadTask.on(
        'state_changed',
        snapshot => {
          if (snapshot.state === 'running') setUploading(true);
        },
        error => {
          setUploading(false);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(url => {
            setUploading(false);
            handleMultiInputChange('resources', {
              index,
              field: 'url',
              value: url,
            });
          });
        },
      );
    }
  };

  return (
    <Resource
      isUploading={isUploading}
      handleUploadMedia={handleUploadMedia}
      handleMultiInputChange={handleMultiInputChange}
      handleAddInput={handleAddInput}
      handleRemoveInput={handleRemoveInput}
      {...props}
    />
  );
});
