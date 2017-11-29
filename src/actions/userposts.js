import axios from 'axios';

import { fetchStorylines, fetchUserStorylines, fetchPosts } from './index'

// ***** ACTION TYPES *****
export const SET_USER_POSTS = 'SET_USER_POSTS'

// ***** ACTION CREATORS *****
export const setUserPosts = userPosts => ({ type: SET_USER_POSTS, userPosts })

export const fetchUserPosts = () => dispatch =>
  axios.get('/api/posts/myposts')
    .then(res => dispatch(setUserPosts(res.data)))

export const addUserPost = (newPost) => dispatch => 
  axios.post('/api/posts/myposts', newPost)
    .then(res => dispatch(fetchUserPosts(res.data)))
    .then(res => dispatch(fetchPosts(res.data)))
    .catch(console.log);

export const createStoryAndPost = (storyData, postData) => dispatch =>
  axios.post('/api/posts/myposts/withstories', { storyData, postData })
    .then(res => dispatch(fetchUserPosts()))
    .then(res => dispatch(fetchPosts()))
    .then(res => dispatch(fetchUserStorylines()))
    .then(res => dispatch(fetchStorylines()))
