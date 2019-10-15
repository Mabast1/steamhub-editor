import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import Skeleton from '@material-ui/lab/Skeleton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FilterIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreIcon from '@material-ui/icons/MoreVert';

import useStyles from './Curriculum-styles';
import Layout from '../Layout';
import * as ROUTES from '../../constants/routes';
import IMAGE_PLACEHOLDER from '../../constants/mediaPlaceholder';

const Curriculum = ({
  pathname,
  isFetching,
  curriculum,
  cardMenu,
  page,
  loadNextPage,
  openCardMenu,
  closeCardMenu,
  handleCreateCog,
  handleDeleteCog,
}) => {
  // Display 25 items per page
  const paginatedCurriculum = curriculum.slice(0, 25 * page);
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
        {(isFetching ? Array.from(new Array(4)) : paginatedCurriculum).map((doc, i) => {
          const cog = !isFetching ? doc.data() : undefined;

          return (
            <div key={isFetching ? i : doc.id}>
              {!isFetching && (
                <IconButton onClick={openCardMenu(doc.id)}>
                  <MoreIcon />
                </IconButton>
              )}
              <Link className="content" to={`${ROUTES.CURRICULUM}/${!isFetching ? doc.id : ''}`}>
                <div className="cover">
                  {isFetching ? (
                    <Skeleton variant="rect" height="100%" />
                  ) : (
                    <img src={cog.cover ? cog.cover : IMAGE_PLACEHOLDER} alt={cog.title} />
                  )}
                </div>
                <div className="details">
                  {isFetching ? (
                    <>
                      <Hidden mdUp implementation="css">
                        <Skeleton height={12} width="75%" style={{ margin: 0, marginBottom: 8 }} />
                        <Skeleton height={10} width="40%" style={{ margin: 0 }} />
                      </Hidden>
                      <Hidden smDown implementation="css">
                        <Skeleton height={14} width="50%" style={{ margin: 0, marginBottom: 8 }} />
                        <Skeleton height={10} width="30%" style={{ margin: 0 }} />
                        <Skeleton height={10} style={{ margin: 0, marginTop: 24 }} />
                        <Skeleton height={10} width="80%" style={{ margin: 0, marginTop: 8 }} />
                      </Hidden>
                    </>
                  ) : (
                    <>
                      <p className="title">{cog.title ? cog.title : 'Untitled'}</p>
                      <p className="author">{cog.authorName}</p>
                      <p className="overview">{cog.overview}</p>
                    </>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
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

      <Button
        className={classes.loadMoreButton}
        onClick={loadNextPage}
        style={paginatedCurriculum.length === curriculum.length ? { display: 'none' } : {}}
        component="span"
        disableRipple
      >
        Load more
      </Button>

      {/* Floating action button for mobile */}
      <Fab className={classes.fab} aria-label="Create new class">
        <AddIcon />
      </Fab>
    </Layout>
  );
};

export default Curriculum;
