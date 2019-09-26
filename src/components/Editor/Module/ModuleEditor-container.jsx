import React from 'react';
import shortid from 'shortid';
import compose from 'recompose/compose';

import ModuleEditor from './ModuleEditor';
import { withFirebase } from '../../Firebase';
import withProtectedRoute from '../../ProtectedRoute';

const ModuleEditorContainer = ({ firebase, match: { params }, location: { pathname } }) => {
  const [storageUrl, setStorageUrl] = React.useState('');
  const [module, setModule] = React.useState({});
  const [tabIndex, setTabIndex] = React.useState(0);
  const [isNewSectionDialogOpen, setNewSectionDialog] = React.useState(false);
  const [publishStatus, setPublishStatus] = React.useState({
    isUploading: false,
    snackbar: { isOpen: false, message: '' },
  });

  React.useEffect(() => {
    sessionStorage.clear();

    firebase
      .module(params.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data();
          document.title = `Steamhub Editor | ${data.name}`;

          setStorageUrl(`${data.cogId}/${params.id}`);
          setModule(data);
        } else {
          throw new Error('Module not found.');
        }
      })
      .catch(err => console.error(err));
  }, [firebase, params.id]);

  // #region Event handlers
  const handleStateChange = React.useCallback((field, value) => {
    setModule(prevState => ({ ...prevState, [field]: value }));
  }, []);

  const handleAddTab = React.useCallback(() => {
    const newTabs = [...module.tabs, { id: shortid.generate(), sections: [], tabName: 'New Tab' }];
    handleStateChange('tabs', newTabs);
  }, [handleStateChange, module.tabs]);

  const handleTabChange = React.useCallback(
    (field, value) => {
      const newTabs = module.tabs.slice();
      newTabs[tabIndex][field] = value;

      handleStateChange('tabs', newTabs);
    },
    [handleStateChange, module.tabs, tabIndex]
  );

  const handleAddNewSection = React.useCallback(
    type => {
      let data;
      switch (type) {
        case 0:
          data = [{ id: shortid.generate(), stdCode: '', stdDesc: '' }];
          break;
        case 1:
          data = [{ id: shortid.generate(), vocab: '', vocabDef: '' }];
          break;
        case 2:
          data = [{ id: shortid.generate(), item: '', quantity: 0, note: '' }];
          break;
        case 3:
          data = [
            {
              id: shortid.generate(),
              popupColor: '',
              popupIcon: '',
              popupMedia: '',
              popupMediaType: '',
              popupText: '',
              text: '<p></p>',
            },
          ];
          break;
        default:
          data = [];
          break;
      }

      const newSection = [
        ...module.tabs[tabIndex].sections,
        { id: shortid.generate(), data, sectionName: '', type },
      ];

      handleTabChange('sections', newSection);
    },
    [handleTabChange, module.tabs, tabIndex]
  );

  const handleSectionChange = React.useCallback(
    (sectionIndex, field, value) => {
      const newSection = module.tabs[tabIndex].sections.slice();
      newSection[sectionIndex][field] = value;

      handleTabChange('sections', newSection);
    },
    [handleTabChange, module.tabs, tabIndex]
  );

  const publishModule = React.useCallback(
    data => {
      firebase
        .module(params.id)
        .set(data, { merge: true })
        .then(() => {
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
    [firebase, params.id]
  );

  const handlePublishModule = React.useCallback(() => {
    const { coverFile, ...newModule } = module;
    const newTab = module.tabs.slice();

    setPublishStatus(prevState => ({ ...prevState, isUploading: true }));

    // Grab serialized HTML texts from session storage
    module.tabs.forEach((tab, tabI) => {
      tab.sections.forEach((section, secI) => {
        if (section.type === 3) {
          const newData = section.data.map(entry => {
            const htmlText = sessionStorage.getItem(entry.id);
            return {
              ...entry,
              text: htmlText || entry.text,
            };
          });

          newTab[tabI].sections[secI].data = newData;
        }
      });
    });

    // Upload cover image only if necessary
    if (coverFile) {
      const storageRef = firebase.storageRef().child(`${storageUrl}/${shortid.generate()}`);

      storageRef
        .put(coverFile)
        .then(() => {
          storageRef.getDownloadURL().then(url => {
            publishModule({ ...newModule, cover: url, tabs: newTab });
          });
        })
        .catch(err => console.error(err));
    } else {
      publishModule({ ...newModule, tabs: newTab });
    }
  }, [firebase, module, publishModule, storageUrl]);

  const handleCloseSnackbar = React.useCallback((_, reason) => {
    if (reason === 'clickaway') return;
    setPublishStatus(prevState => ({
      ...prevState,
      snackbar: { ...prevState.snackbar, isOpen: false },
    }));
  }, []);
  // #endregion Event handlers

  return (
    <ModuleEditor
      storageUrl={storageUrl}
      pathname={pathname}
      module={module}
      tabIndex={tabIndex}
      setTabIndex={setTabIndex}
      isNewSectionDialogOpen={isNewSectionDialogOpen}
      publishStatus={publishStatus}
      handleStateChange={handleStateChange}
      handleAddTab={handleAddTab}
      handleTabChange={handleTabChange}
      setNewSectionDialog={setNewSectionDialog}
      handleAddNewSection={handleAddNewSection}
      handleSectionChange={handleSectionChange}
      handlePublishModule={handlePublishModule}
      handleCloseSnackbar={handleCloseSnackbar}
    />
  );
};

export default compose(
  withProtectedRoute(authUser => !!authUser),
  withFirebase
)(ModuleEditorContainer);
