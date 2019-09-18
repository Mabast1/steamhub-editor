import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/App';
import * as reducers from './reducers';
import Firebase, { FirebaseContext } from './components/Firebase';

// Combine reducers and create Redux store
const rootReducers = combineReducers(reducers);
const store = createStore(rootReducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <FirebaseContext.Provider value={new Firebase()}>
        <App />
      </FirebaseContext.Provider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
