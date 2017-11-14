import _ from 'lodash'

export const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION'
export const SET_RADIUS = 'SET_RADIUS'

export const setCurrentLocation = location => ({ type: SET_CURRENT_LOCATION, location })
export const setRadius = radius => ({ type: SET_RADIUS, radius })

export const setLocationFromGeoLoc = (place, radius) => dispatch => {
  if (!_.isEmpty(place)) {
    dispatch(setCurrentLocation({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    }))
  }
  if (radius) dispatch(setRadius(radius * 1))
}

export function calcDistance (lat1, lon1, lat2, lon2, unit) {
  // source: http://www.geodatasource.com/developers/javascript

  let radlat1 = Math.PI * lat1/180
  let radlat2 = Math.PI * lat2/180
  let theta = lon1-lon2
  let radtheta = Math.PI * theta/180
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist)
  dist = dist * 180/Math.PI
  dist = dist * 60 * 1.1515
  if (unit=="K") { dist = dist * 1.609344 }
  if (unit=="N") { dist = dist * 0.8684 }

  return dist
}