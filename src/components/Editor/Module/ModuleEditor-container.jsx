import React from 'react';
import shortid from 'shortid';
import compose from 'recompose/compose';

import ModuleEditor from './ModuleEditor';
import { withFirebase } from '../../Firebase';
import withProtectedRoute from '../../ProtectedRoute';

const ModuleEditorContainer = ({ firebase, match: { params }, location: { pathname } }) => {
  const [module, setModule] = React.useState({});
  const [tabIndex, setTabIndex] = React.useState(0);

  React.useEffect(() => {
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

  // TODO: Refactor
  const handleInputTabName = React.useCallback(
    (index, value) => {
      const newTabs = module.tabs.slice();
      newTabs[index].tabName = value;

      handleStateChange('tabs', newTabs);
    },
    [handleStateChange, module.tabs]
  );
  // #endregion Event handlers

  return (
    <ModuleEditor
      pathname={pathname}
      module={module}
      tabIndex={tabIndex}
      setTabIndex={setTabIndex}
      handleStateChange={handleStateChange}
      handleAddTab={handleAddTab}
      handleInputTabName={handleInputTabName}
    />
  );
};

export default compose(
  withProtectedRoute(authUser => !!authUser),
  withFirebase
)(ModuleEditorContainer);
