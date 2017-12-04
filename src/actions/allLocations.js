import axios from 'axios';

// ***** ACTION TYPES *****
export const GET_ALL_LOCATIONS = 'GET_ALL_LOCATIONS';

// ***** ACTION CREATORS *****
export const getAllLocations = allLocations => ({ type: GET_ALL_LOCATIONS, allLocations })

export const fetchAllLocations = () => dispatch => 
  axios.get('/api/allLocations')
    .then(res => dispatch(getAllLocations(res.data)))
    .catch(console.log);
