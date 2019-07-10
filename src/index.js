import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import Firebase, { FirebaseContext } from './components/firebase';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Nunito Sans", -apple-system, BlinkMacSystemFont, sans-serif'
  }
});

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
