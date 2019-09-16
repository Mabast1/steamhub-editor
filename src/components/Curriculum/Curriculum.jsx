import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FilterIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreIcon from '@material-ui/icons/MoreVert';

import useStyles from './Curriculum-styles';
import Layout from '../Layout';
import { DesktopLoader, MobileLoader } from './ContentLoader';
import * as ROUTES from '../../constants/routes';

const Curriculum = ({
  pathname,
  isFetching,
  curriculum,
  cardMenu,
  loadNextPage,
  openCardMenu,
  closeCardMenu,
  handleCreateCog,
  handleDeleteCog,
}) => {
  const IMAGE_PLACEHOLDER =
    'https://firebasestorage.googleapis.com/v0/b/steamhub-dev.appspot.com/o/placeholder.png?alt=media&token=f41c489a-a64a-43ec-b20d-3e3418750844';
  const classes = useStyles();

  return (
    <Layout pathname={pathname}>
      {/* Filter tab */}
      <div className={classes.filterTab}>
        <Button onClick={handleCreateCog} disableRipple className={classes.newClass}>
          <AddIcon />
          New Class
        </Button>
        <IconButton size="small">
          <FilterIcon />
        </IconButton>
        <span>Filter by</span>
      </div>

      {/* Display classes */}
      <div className={classes.contentRoot}>
        {curriculum.map(doc => {
          const cog = doc.data();

          return (
            <div key={doc.id}>
              <IconButton onClick={openCardMenu(doc.id)}>
                <MoreIcon />
              </IconButton>
              <Link className="content" to={`${ROUTES.CURRICULUM}/${doc.id}`}>
                <div className="cover">
                  <img src={cog.cover ? cog.cover : IMAGE_PLACEHOLDER} alt={cog.title} />
                </div>
                <div className="details">
                  <p className="title">{cog.title ? cog.title : 'Untitled'}</p>
                  <p className="author">{cog.authorName}</p>
                  <p className="overview">{cog.overview}</p>
                </div>
              </Link>
            </div>
          );
        })}

        {/* Display loading animation while fetching data */}
        {isFetching && (
          <>
            {Array(4)
              .fill('')
              .map((_, i) => (
                <div key={i} style={{ opacity: 1 - 0.25 * i }} className="content-loader">
                  <Hidden mdUp implementation="css">
                    <MobileLoader />
                  </Hidden>
                  <Hidden smDown implementation="css">
                    <DesktopLoader />
                  </Hidden>
                </div>
              ))}
          </>
        )}
      </div>

      <Menu
        className={classes.cardMenu}
        anchorEl={cardMenu.anchor}
        keepMounted
        open={Boolean(cardMenu.anchor)}
        onClose={closeCardMenu}
        elevation={3}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleDeleteCog}>
          <DeleteIcon /> Delete
        </MenuItem>
      </Menu>

      <button type="button" onClick={loadNextPage}>
        Load more...
      </button>

      {/* Floating action button for mobile */}
      <Fab className={classes.fab} aria-label="Create new class">
        <AddIcon />
      </Fab>
    </Layout>
  );
};

export default Curriculum;
