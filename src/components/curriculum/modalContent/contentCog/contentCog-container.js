import React from 'react';
import shortid from 'shortid';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import styles from './contentCog-styles';
import ContentCog from './contentCog';

import { withFirebase } from '../../../firebase';

export default compose(
  withFirebase,
  withStyles(styles)
)(props => {
  const { inputState, setInputState } = props;

  const handleUploadMedia = e => {
    const file = e.target.files[0];

    if (file && file.size < 5000000) {
      const uploadTask = props.firebase
        .storageRef('/cog')
        .child(`${Date.now()}-${file.name}`)
        .put(file);

      uploadTask.on(
        'state_changed',
        snapshot => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setInputState({
            ...inputState,
            isUploading: true,
            uploadProgress: progress
          });
        },
        error => {
          console.error(error);
          setInputState({ ...inputState, isUploading: false });
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(url => {
            setInputState({ ...inputState, isUploading: false, url });
          });
        }
      );
    }
  };

  const handleMultiInputChange = (name, action) => {
    const newArray = inputState[name].map((skill, index) => {
      if (index !== action.index) return skill;

      return { ...skill, text: action.item };
    });

    setInputState({ ...inputState, [name]: newArray });
  };

  const handleAddInput = name => {
    let newArray;
    if (inputState[name] && inputState[name].length > 0) {
      newArray = [
        ...inputState[name].slice(0, inputState[name].length),
        { id: shortid.generate(), text: '' }
      ];
    } else {
      newArray = [{ id: shortid.generate(), text: '' }];
    }

    setInputState({ ...inputState, [name]: newArray });
  };

  const handleRemoveInput = (name, index) => {
    const newArray = [
      ...inputState[name].slice(0, index),
      ...inputState[name].slice(index + 1)
    ];

    setInputState({ ...inputState, [name]: newArray });
  };

  return (
    <ContentCog
      handleUploadMedia={handleUploadMedia}
      handleMultiInputChange={handleMultiInputChange}
      handleAddInput={handleAddInput}
      handleRemoveInput={handleRemoveInput}
      {...props}
    />
  );
});
