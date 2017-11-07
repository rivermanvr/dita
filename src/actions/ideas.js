import axios from 'axios';


// Action types
export const GET_IDEAS = 'GET_IDEAS';

// Action creators
export const getIdeas = (ideas) => {
  return { type: GET_IDEAS, ideas }
}

// Thunks
export const fetchIdeas = () => {
  return (dispatch) => {
    return axios.get('/api/ideas')
      .then(res => res.data)
      .then(ideas => {
        dispatch(getIdeas(ideas));
      });
  }
}

export const postIdea = (newIdea) => {
  return (dispatch) => {
    axios.post('/api/ideas', newIdea)
      .then(() => {
        dispatch(fetchIdeas())
      })
      .catch(console.log);
  }
}
