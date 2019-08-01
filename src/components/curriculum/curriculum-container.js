import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import styles from './curriculum-styles';
import Curriculum from './curriculum';

import {
  getCurrentFolderInfo,
  resetCurrentFolderInfo
} from '../../redux/actions';
import { withProtectedRoute } from '../session';

const mapDispatchToProps = dispatch => ({
  getCurrentFolderInfo: collection =>
    dispatch(getCurrentFolderInfo(collection)),
  resetCurrentFolderInfo: () => dispatch(resetCurrentFolderInfo())
});

export default compose(
  withProtectedRoute(authUser => !!authUser),
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(styles)
)(props => {
  const params = props.location.pathname.split('/').filter(x => x);
  const [data, setData] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    setIsFetching(true);

    let dbPath = '';
    params.forEach((path, index) => {
      if (index === 1) dbPath = `folder/${path}`;
      else if (index !== 0) dbPath += `/folder/${path}`;
    });

    // Fetch current folder info
    if (dbPath) {
      props.getCurrentFolderInfo(() => props.firebase.getDocument(dbPath));
    } else {
      props.resetCurrentFolderInfo();
    }

    // Fetch subfolders
    let listener = props.firebase
      .getCollection(`${dbPath}/folder`)
      .onSnapshot(snapshot => {
        let subfolders = [];

        snapshot.forEach(doc => {
          const data = doc.data();

          if (!data.name) {
            data.name = doc.id;
          }

          subfolders.push({ ...data, id: doc.id });
        });

        setData([...subfolders]);
        setIsFetching(false);
      });

    return () => {
      listener();
    };
  }, [props.location.pathname]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Curriculum
      classes={props.classes}
      history={props.history}
      data={data}
      isFetching={isFetching}
      params={params}
      modalOpen={modalOpen}
      handleModalOpen={handleModalOpen}
      handleModalClose={handleModalClose}
    />
  );
});
