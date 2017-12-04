import { combineReducers } from 'redux';
import currentUser from './currentUser';
import posts from './posts';
import userPosts from './userPosts';
import storylines from './storylines';
import userStorylines from './userStorylines';
import userLocations from './userlocations';
import currentView from './currentView';
import replies from './replies'
import grid from './grid'
import modal from './modal'
import users from './users'
import activePost from './activePost';
import allLocations from './allLocations'

const rootReducer = combineReducers({
  currentUser,
  currentView,
  posts,
  userPosts,
  storylines,
  userStorylines,
  userLocations,
  replies,
  grid,
  modal,
  users,
  activePost, 
  allLocations
});

export default rootReducer;

export * from '../actions'
