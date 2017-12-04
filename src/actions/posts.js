import axios from 'axios';
import { setGrid } from './index';

// ***** ACTION TYPES *****
export const GET_POSTS = 'GET_POSTS';

// ***** ACTION CREATORS *****
export const getPosts = (posts) => ({ type: GET_POSTS, posts })

export const fetchPosts = () => dispatch => 
  axios.get('/api/posts')
    .then(res => {
      dispatch(getPosts(res.data))
      // dispatch(setGrid(res.data))
    })
    .catch(console.log);

// no returns needed, only recording on the back end
export const recordMetrics = (postId, recordDetails) => dispatch =>
  axios.put(`/api/posts/addlife/${postId}`, recordDetails)
