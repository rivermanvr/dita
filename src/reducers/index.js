import { combineReducers } from 'redux';
import currentUser from './currentUser';
import posts from './posts';
import userPosts from './userPosts';
import storylines from './storylines';

const rootReducer = combineReducers({
  currentUser,
  posts,
  userPosts,
  storylines
});

export default rootReducer;

export * from '../actions'
