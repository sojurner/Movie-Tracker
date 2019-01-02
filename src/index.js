import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { fetchMovies } from './sagas/sagas';

import rootReducer from './reducers';

import './index.css';
import App from './containers/App/App';

const sagaMiddleware = createSagaMiddleware();
let middleware;
process.env.NODE_ENV !== 'production'
  ? (middleware = composeWithDevTools(applyMiddleware(sagaMiddleware, logger)))
  : (middleware = applyMiddleware(sagaMiddleware));

const store = createStore(rootReducer, middleware);

sagaMiddleware.run(fetchMovies);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
