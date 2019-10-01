import React from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import CreateModuleDialog from './CreateModuleDialog';
import { withFirebase } from '../../../Firebase';

const CreateModuleDialogContainer = ({ authUser, firebase, handleClose, handleAddModule }) => {
  const [userTemplates, setUserTemplates] = React.useState(undefined);

  React.useEffect(() => {
    firebase
      .templates(authUser.uid)
      .get()
      .then(snapshot => {
        const data = [];
        snapshot.forEach(doc => {
          data.push({ ...doc.data(), id: doc.id });
        });

        setUserTemplates(data);
      })
      .catch(err => console.error(err));
  }, [authUser, firebase]);

  // #region Event handlers
  const handleCreateModule = React.useCallback(
    id => {
      if (id === -1) {
        handleAddModule([{ id: shortid.generate(), sections: [], tabName: 'Overview' }]);
      } else {
        const selectedTemplate = userTemplates.find(template => template.id === id);
        handleAddModule(selectedTemplate.tabs);
      }

      handleClose();
    },
    [handleAddModule, handleClose, userTemplates]
  );

  const handleDeleteTemplate = React.useCallback(
    id => {
      if (window.confirm('Are you sure you want to remove this template?')) {
        firebase
          .template(authUser.uid, id)
          .delete()
          .then(() => {
            const newUserTemplates = userTemplates.filter(template => template.id !== id);
            setUserTemplates([...newUserTemplates]);
          })
          .catch(err => console.error(err));
      }
    },
    [authUser.uid, firebase, userTemplates]
  );
  // #endregion Event handlers

  return (
    <>
      {CreateModuleDialog({
        handleCreateModule,
        handleDeleteTemplate,
        handleClose,
        templates: userTemplates,
      })}
    </>
  );
};

// Redux state management
const mapStateToProps = state => ({
  authUser: state.authUser,
});

export default compose(
  connect(mapStateToProps),
  withFirebase
)(CreateModuleDialogContainer);
