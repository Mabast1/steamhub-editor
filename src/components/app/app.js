import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Home = () => <p>Hello World!</p>;

export default () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
  );
};
