import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../home';
import Signin from '../signin';
import Curriculum from '../curriculum';
import Editor from '../editor';
import NotFound from '../404';

import * as ROUTES from '../../constants/routes';

export default () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.SIGNIN} component={Signin} />
        <Route path={ROUTES.CURRICULUM} component={Curriculum} />
        <Route path={ROUTES.EDITOR} component={Editor} />
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  );
};
