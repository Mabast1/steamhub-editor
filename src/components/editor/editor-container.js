import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import styles from './editor-styles';
import Editor from './editor';

import { withProtectedRoute } from '../session';

export default compose(
  withProtectedRoute(authUser => !!authUser),
  withStyles(styles)
)(props => {
  // TODO: Optimize state management to prevent unnecessary re-rendering.
  const [tabIndex, setTabIndex] = React.useState(0);
  const [editorDrawerOpen, setEditorDrawerOpen] = React.useState(false);
  const [moduleData, setModuleData] = React.useState({});

  React.useEffect(() => {
    if (props.match.params.moduleId) {
      props.firebase
        .module(props.match.params.moduleId)
        .get()
        .then(doc => {
          if (doc.exists) {
            setModuleData({ ...doc.data(), id: doc.id });
          } else {
            throw new Error('Error fetching module.');
          }
        })
        .catch(err => {
          console.error(err.message);
          props.history.replace('/');
        });
    }
  }, []);

  const handleEditorDrawerToggle = toggle => {
    setEditorDrawerOpen(toggle);
  };

  const handleTabIndexChange = index => {
    setTabIndex(index);
  };

  return (
    <Editor
      moduleData={moduleData}
      tabIndex={tabIndex}
      handleTabIndexChange={handleTabIndexChange}
      editorDrawerOpen={editorDrawerOpen}
      handleEditorDrawerToggle={handleEditorDrawerToggle}
      classes={props.classes}
    />
  );
});
