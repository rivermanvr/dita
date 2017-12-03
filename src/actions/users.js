import axios from 'axios';

// ***** ACTION TYPES *****
export const GET_USERS = 'GET_USERS';

// ***** ACTION CREATORS *****
export const getUsers = users => ({ type: GET_USERS, users })

export const fetchUsers = () => dispatch => 
  axios.get('/api/users')
    .then(res => dispatch(getUsers(res.data)))
    .catch(console.log);
