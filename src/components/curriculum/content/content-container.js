import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

import styles from './content-styles';
import Content from './content';

import { withFirebase } from '../../firebase';

export default compose(
  withFirebase,
  withStyles(styles)
)(props => {
  const [data, setData] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(true);
  // TODO: Add loading while fetching curriculum
  React.useEffect(() => {
    let docs = [];
    const params = props.match.params;
    setIsFetching(true);

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

    if (params.cog) {
      getData(props.firebase.modules(), doc => {
        if (doc.data().cogname.toLowerCase() === params.cog) {
          docs.push({ id: doc.id, name: doc.data().module });
        }
      });
    } else if (params.subject) {
      getData(props.firebase.cogs(), doc => {
        if (
          doc.data().subject.toLowerCase() === params.subject &&
          doc.data().grade.toLowerCase() === params.level &&
          doc.data().type.toLowerCase() === params.service
        ) {
          docs.push({ id: doc.id, name: doc.data().cogname });
        }
      });
    } else if (params.level) {
      getData(props.firebase.subjects(), doc => {
        if (
          doc.data().level.toLowerCase() === params.level &&
          doc.data().service.toLowerCase() === params.service
        ) {
          docs.push({ id: doc.id, name: doc.data().subject });
        }
      });
    } else if (params.service) {
      getData(props.firebase.levels(), doc => {
        if (doc.data().service.toLowerCase() === params.service) {
          docs.push({ id: doc.id, name: doc.data().level });
        }
      });
    } else {
      getData(props.firebase.services(), doc => {
        docs.push({ id: doc.id, name: doc.data().service });
      });
    }
  }, []);

  return (
    <React.Fragment>
      {isFetching ? (
        <div>FETCHING DATA</div>
      ) : (
        <Content data={data} {...props} />
      )}
    </React.Fragment>
  );
});
