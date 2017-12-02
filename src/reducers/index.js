import { combineReducers } from 'redux';
import currentUser from './currentUser';
import posts from './posts';
import userPosts from './userPosts';
import storylines from './storylines';
import userStorylines from './userStorylines';
import userLocations from './userLocations';
import currentView from './currentView';
import replies from './replies'
import modal from './modal'

const rootReducer = combineReducers({
  currentUser,
  currentView,
  posts,
  userPosts,
  storylines,
  userStorylines,
  userLocations,
  replies,
  modal
});

export default rootReducer;

export * from '../actions'
