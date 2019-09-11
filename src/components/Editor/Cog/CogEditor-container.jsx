import React from 'react';

import CogEditor from './CogEditor';

const CogEditorContainer = ({ match: { params }, location: { pathname } }) => {
  return <CogEditor params={params} pathname={pathname} />;
};

export default CogEditorContainer;
