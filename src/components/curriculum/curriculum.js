import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from '../layout';
import Content from './content';

export default props => {
  return (
    <Layout>
      <Switch>
        <Route
          path={`${props.match.path}/:service/:level/:subject/:cog`}
          component={props => <Content {...props} />}
        />
        <Route
          path={`${props.match.path}/:service/:level/:subject`}
          component={props => <Content {...props} />}
        />
        <Route
          path={`${props.match.path}/:service/:level`}
          component={props => <Content {...props} />}
        />
        <Route
          path={`${props.match.path}/:service`}
          component={props => <Content {...props} />}
        />
        <Route
          exact
          path={`${props.match.path}`}
          component={props => <Content {...props} />}
        />
      </Switch>
    </Layout>
  );
};
