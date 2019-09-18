import React from 'react';

import CogEditor from './CogEditor';
import { withFirebase } from '../../Firebase';

const CogEditorContainer = ({ firebase, match: { params }, location: { pathname } }) => {
  const [cog, setCog] = React.useState({});

  // Fetch data on component load
  React.useEffect(() => {
    const cogPromise = firebase
      .cog(params.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          return { ...doc.data(), id: doc.id, error: null };
        }

        throw new Error('Document not found.');
      });

    const modulesPromise = firebase
      .modules()
      .where('cogId', '==', params.id)
      .orderBy('number')
      .get()
      .then(snapshot => {
        return snapshot.docs.map(module => ({ id: module.id, name: module.data().name }));
      });

    Promise.all([cogPromise, modulesPromise])
      .then(([a, b]) => {
        setCog({ ...a, modules: b });
      })
      .catch(error => {
        setCog({ error });
      });
  }, [firebase, params.id]);

  // #region Event handlers
  const handleStateChange = React.useCallback((field, value) => {
    setCog(prevState => ({ ...prevState, [field]: value }));
  }, []);
  // #endregion Event handlers

  console.log(cog);

  return <CogEditor pathname={pathname} cog={cog} handleStateChange={handleStateChange} />;
};

export default withFirebase(CogEditorContainer);
