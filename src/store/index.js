import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import ReduxPromise from 'redux-promise';

import reducers from '../reducers';


const store = createStore(
  reducers, composeWithDevTools(applyMiddleware(ReduxPromise, thunkMiddleware, createLogger()
  ))
);

export * from '../actions'
export default store;
