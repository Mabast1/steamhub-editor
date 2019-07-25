import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import styles from './curriculum-styles';
import Curriculum from './curriculum';

import { withProtectedRoute } from '../session';

export default compose(
  withProtectedRoute(authUser => !!authUser),
  withStyles(styles)
)(props => {
  const params = props.location.pathname.split('/').filter(x => x);
  const [data, setData] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    setIsFetching(true);
    let docs, listener;

    const getData = (collection, next) => {
      return collection.onSnapshot(snapshot => {
        docs = [];

        snapshot.forEach(doc => {
          next(doc);
        });

        setData(docs);
        setIsFetching(false);
      });
    };

    switch (params.length) {
      case 1:
        listener = getData(props.firebase.services(), doc => {
          docs.push({ id: doc.id, name: doc.data().service });
        });
        break;
      case 2:
        listener = getData(props.firebase.levels(), doc => {
          if (doc.data().service === params[1]) {
            docs.push({ id: doc.id, name: doc.data().level });
          }
        });
        break;
      case 3:
        listener = getData(props.firebase.subjects(), doc => {
          if (
            doc.data().level === params[2] &&
            doc.data().service === params[1]
          ) {
            docs.push({ id: doc.id, name: doc.data().subject });
          }
        });
        break;
      case 4:
        listener = getData(props.firebase.cogs(), doc => {
          if (
            doc.data().subject === params[3] &&
            doc.data().grade === params[2] &&
            doc.data().type === params[1]
          ) {
            docs.push({ id: doc.id, name: doc.data().cogname });
          }
        });
        break;
      case 5:
        listener = getData(props.firebase.modules(), doc => {
          if (doc.data().cogname === params[4]) {
            docs.push({ id: doc.id, name: doc.data().module });
          }
        });
        break;
      default:
        listener = () => {};
        setData([]);
        setIsFetching(false);
        break;
    }

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
      data={data}
      isFetching={isFetching}
      params={params}
      modalOpen={modalOpen}
      handleModalOpen={handleModalOpen}
      handleModalClose={handleModalClose}
      {...props}
    />
  );
});
