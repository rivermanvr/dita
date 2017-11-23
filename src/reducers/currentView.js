import { SET_CURRENT_LOCATION, SET_RADIUS } from '../actions'
import { isEmpty } from 'lodash'

const initialState = {
  // NYC
  address: 'New York, NY',
  lat: 40.7127753,
  lng: -74.0059728,
  radius: 10
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_LOCATION:
      const location = !isEmpty(action.location) ? action.location : initialState
      return { ...state, ...location }
    case SET_RADIUS:
      return { ...state, radius: action.radius }
    default:
      return state
  }
}