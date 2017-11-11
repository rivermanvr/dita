import axios from 'axios';

// Action
export const GET_POSTS = 'GET_POSTS';

// Action Creator
export const getPosts = (posts) => {
  return { type: GET_POSTS, posts }
}

// Thunks
export const fetchPosts = () => dispatch => 
  axios.get('/api/posts')
    .then(res => {
      dispatch(getPosts(res.data));
    })
    .catch(console.log)



