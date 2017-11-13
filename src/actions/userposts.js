import axios from 'axios';

// ***** ACTION TYPES *****
export const SET_USER_POSTS = 'SET_USER_POSTS'
export const GET_POSTS = 'GET_POSTS';

// ***** ACTION CREATORS *****
export const setUserPosts = userPosts => ({ type: SET_USER_POSTS, userPosts })
export const getPosts = (posts) => ({ type: GET_POSTS, posts })

export const fetchUserPosts = () => dispatch =>
  axios.get('/api/posts/myposts')
    .then(res => dispatch(setUserPosts(res.data)))

export const fetchPosts = () => dispatch => 
  axios.get('/api/posts')
    .then(res => dispatch(getPosts(res.data)))
    .catch(console.log);

export const addUserPost = (newPost) => dispatch => 
  axios.post('/api/posts/myposts', newPost)
    .then(res => dispatch(fetchUserPosts(res.data)))
    .then(res => dispatch(fetchPosts(res.data)))
    .catch(console.log);




