import axios from 'axios';
import { fetchStorylines } from './storylines'
import { fetchPosts, fetchUserPosts } from './userposts'

// ***** ACTION TYPES *****
export const SET_USER_STORYLINES = 'SET_USER_STORYLINES'

// ***** ACTION CREATORS *****
export const setUserStorylines = userStorylines => ({ type: SET_USER_STORYLINES, userStorylines })

export const fetchUserStorylines = () => dispatch =>
  axios.get('/api/storylines/mystorylines')
    .then(res => dispatch(setUserStorylines(res.data)))

export const addStoryline = (newStoryline) => dispatch => 
  axios.post('/api/storylines', newStoryline)
    .then(res => dispatch(fetchUserStorylines()))
    .then(res => dispatch(fetchStorylines()))
    .then(res => dispatch(fetchUserPosts()))
    .then(res => dispatch(fetchPosts()))
    .catch(console.log);

