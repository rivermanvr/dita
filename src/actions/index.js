import axios from 'axios';
import jwt from 'jsonwebtoken'

// ***** ACTION TYPES *****
export const SET_CURRENT_USER = 'SET_CURRENT_USER'

// ***** ACTION CREATORS *****
export const setCurrentUser = user => ({ type: SET_CURRENT_USER, user })

export const loadUserData = token => dispatch => {
  // axios global
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  else delete axios.defaults.headers.common['Authorization']

  dispatch(setCurrentUser(jwt.decode(token).user))
}

export const signIn = authInfo => dispatch =>
  axios.post('/api/auth', authInfo)
    .then(res => {
      const ditaKey = res.data.ditaKey
      localStorage['ditaKey'] = ditaKey

      dispatch(loadUserData(ditaKey))
    })

export const signOut = () => dispatch => {
  delete axios.defaults.headers.common['Authorization']
  delete localStorage.ditaKey
  dispatch(setCurrentUser())
}

export const getData = () => dispatch =>
  axios.get('/api/auth')
    .then(res => console.log(res.data))
