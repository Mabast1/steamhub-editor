import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import Curriculum from './Curriculum';
import { withFirebase } from '../Firebase';
import withProtectedRoute from '../ProtectedRoute';

const CurriculumContainer = ({ authUser, firebase, location: { pathname } }) => {
  // React hooks
  const [curriculum, setCurriculum] = React.useState([]);
  const [isFetching, setFetching] = React.useState(false);

  React.useEffect(() => {
    let cogRef = firebase.cogs();
    if (!authUser.roles.includes('CORPORATE')) {
      cogRef = cogRef.where('authorId', '==', authUser.uid);
    }

    setFetching(true);

    // Fetch first 25 data on component load
    // Read more at https://firebase.google.com/docs/firestore/query-data/query-cursors#paginate_a_query
    cogRef
      .orderBy('updatedAt', 'desc')
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
  }, [authUser, firebase]);

  // Event handlers

  // Here useCallback is used to prevent unnecessary re-render due to reference equality
  // Read more at https://reactjs.org/docs/hooks-reference.html#usecallback
  const loadNextPage = React.useCallback(() => {
    let cogRef = firebase.cogs();
    if (!authUser.roles.includes('CORPORATE')) {
      cogRef = cogRef.where('authorId', '==', authUser.uid);
    }

    setFetching(true);

    cogRef
      .orderBy('updatedAt', 'desc')
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
  }, [authUser, curriculum, firebase]);

  return (
    <Curriculum
      pathname={pathname}
      isFetching={isFetching}
      curriculum={curriculum}
      loadNextPage={loadNextPage}
    />
  );
};

// Redux state management
const mapStateToProps = state => ({
  authUser: state.authUser,
});

export default compose(
  withProtectedRoute(authUser => !!authUser),
  connect(mapStateToProps),
  withFirebase
)(CurriculumContainer);
