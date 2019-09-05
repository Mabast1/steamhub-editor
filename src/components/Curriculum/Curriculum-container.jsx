import React from 'react';
import compose from 'recompose/compose';

import Curriculum from './Curriculum';
import { withFirebase } from '../Firebase';
import withProtectedRoute from '../ProtectedRoute';

const CurriculumContainer = ({ firebase, location }) => {
  // React hooks
  const [curriculum, setCurriculum] = React.useState([]);
  const [isFetching, setFetching] = React.useState(false);

  React.useEffect(() => {
    setFetching(true);

    // Fetch first 25 data on component load
    // Read more at https://firebase.google.com/docs/firestore/query-data/query-cursors#paginate_a_query
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

  // Here useCallback is used to prevent unnecessary re-render due to reference equality
  // Read more at https://reactjs.org/docs/hooks-reference.html#usecallback
  const loadNextPage = React.useCallback(() => {
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
  }, [firebase, curriculum]);

  return (
    <Curriculum
      location={location}
      isFetching={isFetching}
      curriculum={curriculum}
      loadNextPage={loadNextPage}
    />
  );
};

export default compose(
  withProtectedRoute(authUser => !!authUser),
  withFirebase
)(CurriculumContainer);
