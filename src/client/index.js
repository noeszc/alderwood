// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import FontFaceObserver from 'fontfaceobserver';
import { PersistGate } from 'redux-persist/integration/react';
import history from './utils/history';

// CSS library that provides consistent, cross-browser default styling of HTML elements alongside useful defaults.
import 'sanitize.css/sanitize.css';

// Import root app
import App from './containers/App';

import configureStore from './configureStore';

// Import CSS reset and Global Styles
import './global-styles.scss';

// Observe loading of Roboto (to remove roboto, remove the <link> tag in
// the index.html file and this observer)
const robotoObserver = new FontFaceObserver('Roboto', {});

// When Roboto is loaded, add a font-family using Roboto to the body
robotoObserver.load().then(() => {
  document.body.classList.add('font--loaded');
});

// Create redux store with history
const initialState = {};
const { store, persistor } = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  MOUNT_NODE,
);
