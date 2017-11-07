import axios from 'axios';
import jwt from 'jsonwebtoken'

import { fetchUserPosts, setUserPosts } from './userpostsactions'

// ***** ACTION TYPES *****
export const SET_CURRENT_USER = 'SET_CURRENT_USER'

// ***** ACTION CREATORS *****
export const setCurrentUser = user => ({ type: SET_CURRENT_USER, user })

export const loadUserData = data => dispatch => {
  // axios global
  const token = data.ditaKey
  localStorage['ditaKey'] = token 

  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  else delete axios.defaults.headers.common['Authorization']

  dispatch(setCurrentUser(jwt.decode(token).user))
  dispatch(fetchUserPosts())
}

export const signIn = authInfo => dispatch =>
  axios.post('/api/auth', authInfo)
    .then(res => dispatch(loadUserData(res.data)))

export const signOut = () => dispatch => {
  delete axios.defaults.headers.common['Authorization']
  delete localStorage.ditaKey
  dispatch(setCurrentUser())
  dispatch(setUserPosts())
}

export const signUp = data => dispatch =>
  axios.post('/api/users', data)
    .then(res => dispatch(loadUserData(res.data)))

export const getData = () => dispatch =>
  axios.get('/api/auth')
    .then(res => console.log(res.data))
