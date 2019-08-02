import React from 'react';

export default ({ storagePath, firebase, handleInputChange, Component }) => {
  const [isUploading, setUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const handleUploadMedia = e => {
    const file = e.target.files[0];

    if (file && file.size < 5000000) {
      const uploadTask = firebase
        .storageRef(storagePath)
        .child(`${Date.now()}-${file.name}`)
        .put(file);

      uploadTask.on(
        'state_changed',
        snapshot => {
          let progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setUploading(true);
          setUploadProgress(progress);
        },
        error => {
          setUploading(false);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(url => {
            setUploading(false);
            handleInputChange('url', url);
          });
        }
      );
    }
  };

  return (
    <Component
      isUploading={isUploading}
      uploadProgress={uploadProgress}
      handleUploadMedia={handleUploadMedia}
    />
  );
};
