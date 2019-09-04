import React from 'react';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

import styles from './Curriculum-styles';
import Curriculum from './Curriculum';
import { withFirebase } from '../Firebase';
import withProtectedRoute from '../ProtectedRoute';

const CurriculumContainer = ({ classes, firebase }) => {
  const [curriculum, setCurriculum] = React.useState([]);
  const [isFetching, setFetching] = React.useState(false);

  // Fetch data on component load
  React.useEffect(() => {
    setFetching(true);

    firebase
      .cogs()
      .orderBy('updatedAt')
      .limit(25)
      .get()
      .then(snapshot => {
        setCurriculum([...snapshot.docs]);
      })
      .then(() => {
        setFetching(false);
      })
      .catch(() => {
        setFetching(false);
      });
  }, [firebase]);

  // Event handlers
  const loadNextPage = () => {
    setFetching(true);

    firebase
      .cogs()
      .orderBy('updatedAt')
      .startAfter(curriculum[curriculum.length - 1])
      .limit(25)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          setCurriculum(prevState => [...prevState, ...snapshot.docs]);
        }
      })
      .then(() => {
        setFetching(false);
      })
      .catch(() => {
        setFetching(false);
      });
  };

  return (
    <Curriculum
      classes={classes}
      isFetching={isFetching}
      curriculum={curriculum}
      loadNextPage={loadNextPage}
    />
  );
};

export default compose(
  withProtectedRoute(authUser => !!authUser),
  withFirebase,
  withStyles(styles)
)(CurriculumContainer);
