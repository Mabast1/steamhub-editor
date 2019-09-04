import React from 'react';

import Hidden from '@material-ui/core/Hidden';

import Layout from '../Layout';
import { DesktopLoader, MobileLoader } from './ContentLoader';

const Curriculum = ({ classes, isFetching, curriculum, loadNextPage }) => {
  return (
    <Layout>
      <div className={classes.contentRoot}>
        {curriculum.map(doc => {
          const data = doc.data();

          return (
            <div key={doc.id} className="content">
              <div className="cover">
                <img src={data.cover} alt={data.name} />
              </div>
              <div className="details">
                <p className="title">{data.name}</p>
                <p className="author">{data.author}</p>
                <p className="overview">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae voluptates
                  facilis necessitatibus nulla eaque? Velit tenetur harum blanditiis libero ad,
                  assumenda amet consectetur eos est nisi rerum animi, dolorum odio.
                </p>
              </div>
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

      <button type="button" onClick={loadNextPage}>
        Load more...
      </button>
    </Layout>
  );
};

export default Curriculum;
