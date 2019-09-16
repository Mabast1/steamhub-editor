import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

// Lazy load components to improve initial page load
// Read more at https://reactjs.org/docs/code-splitting.html
const Landing = lazy(() => import('../Landing'));
const Signin = lazy(() => import('../Signin'));
const Dashboard = lazy(() => import('../Dashboard'));
const Profile = lazy(() => import('../Profile'));
const Curriculum = lazy(() => import('../Curriculum'));
const CogEditor = lazy(() => import('../Editor/Cog'));

const App = () => {
  return (
    <>
      <Suspense fallback={null}>
        <Switch>
          <Route exact path={ROUTES.LANDING} render={() => <Landing />} />
          <Route path={ROUTES.SIGNIN} render={props => <Signin {...props} />} />
          <Route path={ROUTES.DASHBOARD} render={props => <Dashboard {...props} />} />
          <Route path={ROUTES.PROFILE} render={props => <Profile {...props} />} />
          <Route exact path={ROUTES.CURRICULUM} render={props => <Curriculum {...props} />} />
          <Route path={`${ROUTES.CURRICULUM}/:id`} render={props => <CogEditor {...props} />} />
        </Switch>
      </Suspense>
    </>
  );
};

export default App;
