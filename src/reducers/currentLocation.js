import { SET_CURRENT_LOCATION } from '../actions'

const initialState = {
  // NYC
  lat: 40.7127753,
  long: -74.0059728
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_LOCATION:
      return action.location
    default:
      return state
  }
}