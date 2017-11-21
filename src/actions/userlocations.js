import axios from 'axios';

// ***** ACTION TYPES *****
export const SET_USER_LOCATIONS = 'SET_USER_LOCATIONS'

// ***** ACTION CREATORS *****
export const setUserLocations = userLocations => ({ type: SET_USER_LOCATIONS, userLocations })

export const fetchUserLocations = () => dispatch =>
  axios.get('/api/locations')
    .then(res => dispatch(setUserLocations(res.data)))

export const addUserLocation = newLocation => dispatch => 
  axios.post('/api/locations', newLocation)
    .then(() => dispatch(fetchUserLocations()))

export const removeUserLocation = location => dispatch => 
  axios.delete(`/api/locations/${location.id}`)
    .then(() => dispatch(fetchUserLocations()))
