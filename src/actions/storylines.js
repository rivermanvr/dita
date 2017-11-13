import axios from 'axios';


// Action types
export const GET_STORYLINES = 'GET_STORYLINES';

// Action creators
export const getStorylines = (storylines) => {
  return { type: GET_STORYLINES, storylines }
}

// Thunks
export const fetchStorylines = () => {
  return (dispatch) => {
    return axios.get('/api/storylines')
      .then(res => res.data)
      .then(storylines => {
        dispatch(getStorylines(storylines));
      });
  }
}

// export const addStoryline = (newStoryline) => {
//   return (dispatch) => {
//     axios.post('/api/storylines', newStoryline)
//       .then(() => {
//         dispatch(fetchStorylines())
//       })
//       .catch(console.log);
//   }
// }
