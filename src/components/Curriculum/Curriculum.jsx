import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import FilterIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';

import useStyles from './Curriculum-styles';
import Layout from '../Layout';
import { DesktopLoader, MobileLoader } from './ContentLoader';
import * as ROUTES from '../../constants/routes';

const Curriculum = ({ pathname, isFetching, curriculum, loadNextPage }) => {
  const classes = useStyles();

  return (
    <Layout pathname={pathname}>
      {/* Filter tab */}
      <div className={classes.filterTab}>
        <Button disableRipple className={classes.newClass}>
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
            <Link key={doc.id} className="content" to={`${ROUTES.CURRICULUM}/${doc.id}`}>
              <div className="cover">
                <img src={cog.cover} alt={cog.name} />
              </div>
              <div className="details">
                <p className="title">{cog.name}</p>
                <p className="author">{cog.authorName}</p>
                <p className="overview">{cog.overview}</p>
              </div>
            </Link>
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
