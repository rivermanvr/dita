import axios from 'axios';


// Action types
export const GET_POSTS = 'GET_POSTS';

// Action creators
export const getPosts = (posts) => {
  return { type: GET_POSTS, posts }
}

// Thunks
export const fetchPosts = () => {
  return (dispatch) => {
    return axios.get('/api/posts/allposts')
      .then(res => res.data)
      .then(posts => {
        dispatch(getPosts(posts));
      });
  }
}

export const addPost = (newPost) => {
  return (dispatch) => {
    axios.post('/api/posts', newPost)
      .then(() => {
        dispatch(fetchPosts())
      })
      .catch(console.log);
  }
}
