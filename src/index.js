import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import { nasaActions } from './reducers';

const initialState = {
  page: 'home'
}

const store = createStore(nasaActions,
  initialState,
  compose (
    applyMiddleware(reduxThunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
