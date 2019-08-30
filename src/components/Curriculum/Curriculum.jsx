import React from 'react';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';

import styles from './Curriculum-styles';
import Layout from '../Layout';
import DesktopLoader from './ContentLoader';
import withProtectedRoute from '../ProtectedRoute';

const Curriculum = ({ classes }) => {
  return (
    <Layout>
      <div className={classes.contentRoot}>
        <Hidden smDown implementation="js">
          {Array(4)
            .fill('')
            .map((_, i) => (
              // Disable ESLint rule
              // eslint-disable-next-line react/no-array-index-key
              <div key={i} style={{ opacity: 1 - 0.25 * i }} className="content-loader">
                <DesktopLoader />
              </div>
            ))}
        </Hidden>
      </div>
    </Layout>
  );
};

export default compose(
  withProtectedRoute(authUser => !!authUser),
  withStyles(styles)
)(Curriculum);
