import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../home';
import Signin from '../signin';
import Curriculum from '../curriculum';
import NotFound from '../404';

import * as ROUTES from '../../constants/routes';

export default ({ classes }) => {
  return (
    <div className={classes.appRoot}>
      <Switch>
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.SIGNIN} component={Signin} />
        <Route path={ROUTES.CURRICULUM} component={Curriculum} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};
