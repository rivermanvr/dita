import { combineReducers } from 'redux';
import currentUser from './currentUser';
import ideas from './ideas';

const rootReducer = combineReducers({
  currentUser, ideas
});

export default rootReducer;

export * from '../actions'
