import { SET_CURRENT_LOCATION, SET_RADIUS } from '../actions'

const initialState = {
  // NYC
  lat: 40.7127753,
  long: -74.0059728,
  radius: 10
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_LOCATION:
      return { ...state, ...action.location }
    case SET_RADIUS:
      return { ...state, radius: action.radius }
    default:
      return state
  }
}