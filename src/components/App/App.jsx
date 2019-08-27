import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const Dashboard = lazy(() => import('../Dashboard'));

function App() {
  return (
    <div>
      <Suspense fallback={null}>
        <Switch>
          <Route exact path="/" render={() => <Dashboard />} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
