import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/app';

import * as reducers from './redux/reducers';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/firebase';

const rootReducers = combineReducers(reducers);
const store = createStore(rootReducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
