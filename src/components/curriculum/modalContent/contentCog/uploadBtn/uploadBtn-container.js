import React from 'react';

import UploadMedia from '../../../../uploadMedia';
import UploadButton from './uploadBtn';

export default props => {
  return (
    <UploadMedia
      storagePath='/cog'
      firebase={props.firebase}
      handleInputChange={props.handleInputChange}
      Component={UploadButton}
    />
  );
};
