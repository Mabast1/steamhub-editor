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
  const [data, setData] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(true);

  React.useEffect(() => {
    setIsFetching(true);

    let docs = [];
    let params = props.location.pathname.split('/');
    if (params[params.length - 1] === '') params = params.slice(0, -1);

    const getData = (collection, next) => {
      collection
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            next(doc);
          });
        })
        .then(() => {
          setIsFetching(false);
          setData(docs);
        });
    };

    if (params.length === 6) {
      getData(props.firebase.modules(), doc => {
        if (doc.data().cogname.toLowerCase() === params[5]) {
          docs.push({ id: doc.id, name: doc.data().module });
        }
      });
    } else if (params.length === 5) {
      getData(props.firebase.cogs(), doc => {
        if (
          doc.data().subject.toLowerCase() === params[4] &&
          doc.data().grade.toLowerCase() === params[3] &&
          doc.data().type.toLowerCase() === params[2]
        ) {
          docs.push({ id: doc.id, name: doc.data().cogname });
        }
      });
    } else if (params.length === 4) {
      getData(props.firebase.subjects(), doc => {
        if (
          doc.data().level.toLowerCase() === params[3] &&
          doc.data().service.toLowerCase() === params[2]
        ) {
          docs.push({ id: doc.id, name: doc.data().subject });
        }
      });
    } else if (params.length === 3) {
      getData(props.firebase.levels(), doc => {
        if (doc.data().service.toLowerCase() === params[2]) {
          docs.push({ id: doc.id, name: doc.data().level });
        }
      });
    } else {
      getData(props.firebase.services(), doc => {
        docs.push({ id: doc.id, name: doc.data().service });
      });
    }
  }, [props.location.pathname]);

  return <Curriculum data={data} isFetching={isFetching} {...props} />;
});
