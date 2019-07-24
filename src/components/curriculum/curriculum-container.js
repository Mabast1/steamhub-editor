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
    let docs = [];

    const getData = (collection, next) => {
      collection
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            next(doc);
          });
        })
        .then(() => {
          setData(docs);
          setIsFetching(false);
        });
    };

    switch (params.length) {
      case 1:
        getData(props.firebase.services(), doc => {
          docs.push({ id: doc.id, name: doc.data().service });
        });
        break;
      case 2:
        getData(props.firebase.levels(), doc => {
          if (doc.data().service.toLowerCase() === params[1]) {
            docs.push({ id: doc.id, name: doc.data().level });
          }
        });
        break;
      case 3:
        getData(props.firebase.subjects(), doc => {
          if (
            doc.data().level.toLowerCase() === params[2] &&
            doc.data().service.toLowerCase() === params[1]
          ) {
            docs.push({ id: doc.id, name: doc.data().subject });
          }
        });
        break;
      case 4:
        getData(props.firebase.cogs(), doc => {
          if (
            doc.data().subject.toLowerCase() === params[3] &&
            doc.data().grade.toLowerCase() === params[2] &&
            doc.data().type.toLowerCase() === params[1]
          ) {
            docs.push({ id: doc.id, name: doc.data().cogname });
          }
        });
        break;
      case 5:
        getData(props.firebase.modules(), doc => {
          if (doc.data().cogname.toLowerCase() === params[4]) {
            docs.push({ id: doc.id, name: doc.data().module });
          }
        });
        break;
      default:
        setData([]);
        setIsFetching(false);
        break;
    }
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
