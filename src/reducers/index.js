import { combineReducers } from 'redux';
import currentUser from './currentUser';
import posts from './posts';
import userPosts from './userPosts'

const rootReducer = combineReducers({
  currentUser,
  posts,
  userPosts
});

export default rootReducer;

export * from '../actions'
