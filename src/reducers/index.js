import { combineReducers } from 'redux';
import currentUser from './currentUser';
import posts from './posts';
import userPosts from './userPosts';
import storylines from './storylines';
import userStorylines from './userStorylines';
import currentLocation from './currentLocation';

const rootReducer = combineReducers({
  currentUser,
  currentLocation,
  posts,
  userPosts,
  storylines,
  userStorylines
});

export default rootReducer;

export * from '../actions'
