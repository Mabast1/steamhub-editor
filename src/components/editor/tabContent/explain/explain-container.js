import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import styles from './explain-styles';
import Explain from './explain';

import { withFirebase } from '../../../firebase';

export default compose(
  withFirebase,
  withStyles(styles)
)(props => {
  const [isUploading, setUploading] = React.useState(false);

  const handleText = (section, field, value) => {
    props.setInputState(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value
      }
    }));
  };

  const handleMedia = (section, parent, field, value) => {
    props.setInputState(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [parent]: {
          ...prevState[section][parent],
          [field]: value
        }
      }
    }));
  };

  const handleUploadMedia = e => {
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
            handleMedia('explain', 'media', 'url', url);
          });
        }
      );
    }
  };

  return (
    <Explain
      isUploading={isUploading}
      handleText={handleText}
      handleMedia={handleMedia}
      handleUploadMedia={handleUploadMedia}
      {...props}
    />
  );
});
