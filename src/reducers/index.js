import { combineReducers } from 'redux';
import currentUser from './currentUser';
import ideas from './ideas';
import userPosts from './userPosts'

const rootReducer = combineReducers({
  currentUser,
  ideas,
  userPosts
});

export default rootReducer;

export * from '../actions'
