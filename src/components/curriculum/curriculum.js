import React from 'react';
import { Link } from 'react-router-dom';

import Layout from '../layout';

export default ({ data, isFetching, location: { pathname } }) => {
  const path = (pathname[pathname.length - 1] === '/' ? pathname.slice(0, -1) : pathname);

  return (
    <Layout>
      {isFetching ? (
        // TODO: Add loading screen while fetching curriculum
        <div>FETCHING DATA</div>
      ) : (
        <ul>
          {data.map(item => {
            return (
              <li key={item.id}>
                <Link to={`${path}/${item.name.toLowerCase()}`}>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Layout>
  );
};
