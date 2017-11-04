import axios from 'axios';
import jwt from 'jsonwebtoken'

// ***** ACTION TYPES *****
export const SET_CURRENT_USER = 'SET_CURRENT_USER'

// ***** ACTION CREATORS *****
export const setCurrentUser = user => ({ type: SET_CURRENT_USER, user })

export const signIn = authInfo => dispatch =>
  axios.post('/api/auth', authInfo)
    .then(res => {
      const ditaKey = res.data.ditaKey
      localStorage['ditaKey'] = ditaKey

      const user = jwt.decode(ditaKey).user
      dispatch(setCurrentUser(user))
    })

export const signOut = () => dispatch => {
  delete localStorage.ditaKey
  dispatch(setCurrentUser())
}