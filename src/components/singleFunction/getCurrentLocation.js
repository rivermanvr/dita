// promise for getting current location

import GoogleMaps from '@google/maps'

// google maps
let googleMapsClient = GoogleMaps.createClient({
  key: require('../../../env.json').GoogleServerAPI,
  Promise: Promise
});

// needs testing
export default function showPosition (position) {
  console.log('location found, querying google maps...')
  return new Promise((resolve, reject) => {
    googleMapsClient.reverseGeocode({
      latlng: [
        position.coords.latitude,
        position.coords.longitude
      ]
    }, (err, response) => {
      if (err) return reject(err)
      resolve(response)
    })
  })
}
