const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION'
const SET_RADIUS = 'SET_RADIUS'

const setCurrentLocation = location => ({ type: SET_CURRENT_LOCATION, location })
const setRadius = radius => ({ type: SET_RADIUS, radius })

const setLocationFromGeoLoc = path => dispatch => {
  // do stuff
  // dispatch setCurr
}