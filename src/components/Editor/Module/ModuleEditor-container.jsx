import React from 'react';
import shortid from 'shortid';
import compose from 'recompose/compose';

import ModuleEditor from './ModuleEditor';
import { withFirebase } from '../../Firebase';
import withProtectedRoute from '../../ProtectedRoute';

const ModuleEditorContainer = ({ firebase, match: { params }, location: { pathname } }) => {
  const [module, setModule] = React.useState({});
  const [tabIndex, setTabIndex] = React.useState(0);
  const [isNewSectionDialogOpen, setNewSectionDialog] = React.useState(false);

  React.useEffect(() => {
    sessionStorage.clear();

    firebase
      .module(params.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          setModule(doc.data());
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

  const handlePublishModule = React.useCallback(() => {
    const { coverFile, ...newModule } = module;
    const newTab = module.tabs.slice();

    module.tabs.forEach((tab, tabI) => {
      tab.sections.forEach((section, secI) => {
        if (section.type === 3) {
          const newData = section.data.map((entry, entryI) => {
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

    if (coverFile) {
      const storageRef = firebase
        .storageRef()
        .child(`${module.cogId}/${params.id}/${shortid.generate()}`);

      // Upload cover image
      storageRef
        .put(coverFile)
        .then(() => {
          storageRef
            .getDownloadURL()
            .then(url => {
              firebase
                .module(params.id)
                .set({ ...newModule, cover: url, tabs: newTab }, { merge: true });
            })
            .catch(() => {
              throw new Error('Error uploading image.');
            });
        })
        .catch(err => console.error(err));
    } else {
      firebase.module(params.id).set({ ...newModule, tabs: newTab }, { merge: true });
    }
  }, [firebase, module, params.id]);
  // #endregion Event handlers

  return (
    <ModuleEditor
      pathname={pathname}
      module={module}
      tabIndex={tabIndex}
      setTabIndex={setTabIndex}
      isNewSectionDialogOpen={isNewSectionDialogOpen}
      handleStateChange={handleStateChange}
      handleAddTab={handleAddTab}
      handleTabChange={handleTabChange}
      setNewSectionDialog={setNewSectionDialog}
      handleAddNewSection={handleAddNewSection}
      handleSectionChange={handleSectionChange}
      handlePublishModule={handlePublishModule}
    />
  );
};

export default compose(
  withProtectedRoute(authUser => !!authUser),
  withFirebase
)(ModuleEditorContainer);
