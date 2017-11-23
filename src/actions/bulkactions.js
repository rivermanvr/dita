import {
  fetchUserPosts, setUserPosts,
  fetchUserStorylines, setUserStorylines,
  fetchUserLocations, setUserLocations,
  setLocationFromPin } from './index'

export const loadUser = () => dispatch => {
  dispatch(fetchUserPosts())
  dispatch(fetchUserStorylines())
  dispatch(fetchUserLocations())
    .then(action =>
      dispatch(setLocationFromPin(action.userLocations.find(location => location.isHome))))
}

export const resetApp = () => dispatch => {
  dispatch(setUserPosts())
  dispatch(setUserStorylines())
  dispatch(setUserLocations()) 
  dispatch(setLocationFromPin()) 
}