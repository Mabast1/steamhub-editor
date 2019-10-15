import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

import Curriculum from './Curriculum';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import withProtectedRoute from '../ProtectedRoute';

const CurriculumContainer = ({ authUser, firebase, location: { pathname } }) => {
  const [curriculum, setCurriculum] = React.useState([]);
  const [isFetching, setFetching] = React.useState(false);
  const [cardMenu, setCardMenu] = React.useState({ id: '', anchor: null });
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    document.title = `Steamhub Editor`;

    setFetching(true);
    let cogRef = firebase.cogs();
    if (!authUser.roles.includes('CORPORATE')) {
      cogRef = cogRef.where('authorId', '==', authUser.uid);
    }

    cogRef
      .orderBy('updatedAt', 'desc')
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

  // #region Event handlers

  // Here useCallback is used to prevent unnecessary re-render due to reference equality
  // Read more at https://reactjs.org/docs/hooks-reference.html#usecallback
  const loadNextPage = React.useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const openCardMenu = React.useCallback(
    id => event => {
      setCardMenu({ id, anchor: event.currentTarget });
    },
    []
  );

  const closeCardMenu = React.useCallback(() => {
    setCardMenu({ id: '', anchor: null });
  }, []);

  const handleCreateCog = React.useCallback(() => {
    firebase
      .cogs()
      .add({
        authorId: authUser.uid,
        authorName: authUser.name,
        cover: '',
        grade: '',
        overview: '',
        rwc: '',
        skills: [],
        subject: '',
        title: '',
        type: '',
        updatedAt: Math.floor(Date.now() / 1000),
      })
      .then(doc => {
        const win = window.open(`${ROUTES.CURRICULUM}/${doc.id}`, '_blank');
        win.focus();
      })
      .catch(err => console.error('Error creating class: ', err));
  }, [authUser, firebase]);

  const handleDeleteCog = React.useCallback(() => {
    if (window.confirm('Are you sure you want to remove this class?')) {
      firebase
        .cog(cardMenu.id)
        .delete()
        .then(() => {
          closeCardMenu();

          // Remove the document from React state to force component re-render
          const newCurriculum = curriculum.filter(doc => doc.id !== cardMenu.id);
          setCurriculum(newCurriculum);
        })
        .then(() => {
          firebase
            .modules()
            .where('cogId', '==', cardMenu.id)
            .get()
            .then(snapshot => {
              const batch = firebase.batch();
              snapshot.forEach(doc => batch.delete(doc.ref));

              return batch.commit();
            })
            .catch(() => {
              throw new Error('Error removing modules.');
            });
        })
        .catch(err => console.error('Error removing class: ', err));
    }
  }, [cardMenu.id, closeCardMenu, curriculum, firebase]);
  // #endregion Event handlers

  return (
    <Curriculum
      pathname={pathname}
      isFetching={isFetching}
      curriculum={curriculum}
      page={page}
      loadNextPage={loadNextPage}
      cardMenu={cardMenu}
      openCardMenu={openCardMenu}
      closeCardMenu={closeCardMenu}
      handleCreateCog={handleCreateCog}
      handleDeleteCog={handleDeleteCog}
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
