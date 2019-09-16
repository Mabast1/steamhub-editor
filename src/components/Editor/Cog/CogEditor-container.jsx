import React from 'react';

import CogEditor from './CogEditor';
import { withFirebase } from '../../Firebase';

const CogEditorContainer = ({ firebase, match: { params }, location: { pathname } }) => {
  const [cog, setCog] = React.useState({});

  // Fetch class document on component load
  React.useEffect(() => {
    firebase
      .cog(params.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = { ...doc.data(), id: doc.id, error: null };
          setCog(data);
        } else {
          throw new Error('Document not found.');
        }
      })
      .catch(error => {
        setCog({ error });
      });
  }, [firebase, params.id]);

  console.log(cog);

  return <CogEditor cog={cog} pathname={pathname} />;
};

export default withFirebase(CogEditorContainer);
