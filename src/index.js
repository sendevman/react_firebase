import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';

import Routes from './routes';
import configureStore from './store/store';
import * as serviceWorker from './serviceWorker';

import './assets/css/index.css';

const initialState = fromJS({});
const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
