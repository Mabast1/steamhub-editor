import React from 'react';
import shortid from 'shortid';
import compose from 'recompose/compose';

import CogEditor from './CogEditor';
import { withFirebase } from '../../Firebase';
import withProtectedRoute from '../../ProtectedRoute';

const CogEditorContainer = ({ firebase, match: { params }, location: { pathname } }) => {
  const [cog, setCog] = React.useState({});
  const [publishStatus, setPublishStatus] = React.useState({
    isUploading: false,
    snackbar: { isOpen: false, message: '' },
  });

  // Fetch data on component load
  React.useEffect(() => {
    const cogPromise = firebase
      .cog(params.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data();
          const skills = data.skills.map(skill => ({ id: shortid.generate(), label: skill }));

          return { ...data, id: doc.id, skills, error: null };
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

  const handleAddChip = React.useCallback(e => {
    const { value } = e.target;

    if (e.key === 'Enter' && value) {
      e.preventDefault();

      setCog(prevState => {
        const newSkills = [...prevState.skills.slice(), { id: shortid.generate(), label: value }];

        return {
          ...prevState,
          skills: newSkills,
        };
      });

      e.target.value = '';
    }
  }, []);

  const handleDeleteChip = React.useCallback(
    chip => () => {
      setCog(prevState => {
        const newSkills = prevState.skills.filter(skill => skill.id !== chip.id);

        return {
          ...prevState,
          skills: newSkills,
        };
      });
    },
    []
  );

  const handleAddModule = React.useCallback(() => {
    firebase
      .modules()
      .add({
        authorId: cog.authorId,
        authorName: cog.authorName,
        cogId: params.id,
        cover: '',
        descr: '',
        name: 'New module',
        number: cog.modules.length + 1,
        tabs: [{ id: shortid.generate(), sections: [], tabName: 'Overview' }],
      })
      .then(doc => {
        setCog(prevState => ({
          ...prevState,
          modules: [...prevState.modules, { id: doc.id, name: 'New module' }],
        }));
      })
      .catch(err => console.error(err));
  }, [cog, params, firebase]);

  const handleDeleteModule = React.useCallback(
    moduleId => {
      if (window.confirm('Are you sure you want to remove this module?')) {
        firebase
          .module(moduleId)
          .delete()
          .then(() => {
            const newModules = cog.modules.filter(module => module.id !== moduleId);

            newModules.forEach((module, index) => {
              firebase.module(module.id).set({ number: index + 1 }, { merge: true });
            });

            setCog(prevState => ({ ...prevState, modules: newModules }));
          });
      }
    },
    [cog.modules, firebase]
  );

  const publishCog = React.useCallback(
    (data, modules) => {
      firebase
        .cog(data.id)
        .set({ ...data }, { merge: true })
        .then(() => {
          // Re-order module numbers
          modules.forEach((module, index) => {
            firebase.module(module.id).set({ number: index + 1 }, { merge: true });
          });

          setPublishStatus({
            isUploading: false,
            snackbar: { isOpen: true, message: 'Class has been successfully saved!' },
          });
        })
        .catch(() => {
          setPublishStatus({
            isUploading: false,
            snackbar: { isOpen: true, message: 'Error saving data! Try again' },
          });
        });
    },
    [firebase]
  );

  const handleSaveCog = React.useCallback(() => {
    const updatedAt = Math.floor(Date.now() / 1000);
    const skills = cog.skills.map(skill => skill.label);
    const newCog = { ...cog, skills, updatedAt };
    const { error, modules, coverFile, ...data } = newCog;

    setPublishStatus(prevState => ({ ...prevState, isUploading: true }));

    if (coverFile) {
      const storageRef = firebase.storageRef().child(`${cog.id}/${shortid.generate()}`);

      // Upload cover image
      storageRef
        .put(coverFile)
        .then(() => {
          storageRef
            .getDownloadURL()
            .then(url => {
              publishCog({ ...data, cover: url }, modules);
            })
            .catch(() => {
              throw new Error('Error uploading image.');
            });
        })
        .catch(err => console.error(err));
    } else {
      publishCog(data, modules);
    }
  }, [cog, publishCog, firebase]);

  const handleCloseSnackbar = React.useCallback((_, reason) => {
    if (reason === 'clickaway') return;
    setPublishStatus(prevState => ({
      ...prevState,
      snackbar: { ...prevState.snackbar, isOpen: false },
    }));
  }, []);
  // #endregion Event handlers

  return (
    <CogEditor
      pathname={pathname}
      cog={cog}
      publishStatus={publishStatus}
      handleStateChange={handleStateChange}
      handleAddChip={handleAddChip}
      handleDeleteChip={handleDeleteChip}
      handleAddModule={handleAddModule}
      handleDeleteModule={handleDeleteModule}
      handleSaveCog={handleSaveCog}
      handleCloseSnackbar={handleCloseSnackbar}
    />
  );
};

export default compose(
  withProtectedRoute(authUser => !!authUser),
  withFirebase
)(CogEditorContainer);
