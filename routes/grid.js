const router = require('express').Router(),
  { Post } = require('../db').models

function calcDistance (lat1, lon1, lat2, lon2, unit) {
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

const newGridState = (posts, radius) => {
  let startT = new Date()
  console.log('creating new map')

  let uniMap = JSON.parse(JSON.stringify(posts)).map((post, i) => {
    // search vertices
    let lat = post.latitude,
      lon = post.longitude

    post.vertices = []

    posts.slice(i + 1).forEach(p => {
      if (calcDistance(lat, lon, p.latitude, p.longitude) < radius) {
        post.vertices.push(p)
      }
    })

    return post
  })

  let toShow = uniMap.filter(m => m.vertices.length),
    toVanish = toShow.reduce((vs, i) => (vs.concat(i.vertices)), []).map(v => v.id)

  let newMap = uniMap.filter(v => !toVanish.includes(v.id)).map(v => {
    if (v.vertices.length) {
      v.verticeData = {
        averageHl: v.vertices.reduce((total, i) => (total += i.halflife), 0) / v.vertices.length,
        count: v.vertices.length
      }  
    }
    return v
  })

  let finT = new Date()
  console.log(`build complete in ${(finT-startT)}ms`)
  return newMap
},
zoomRadius = [
  // set as many zoom radius as desired
  // front end clusters based on max zoom level within these keys
  // ex 4 will use zoom of 5
  //    1 will use zoom of 3
  { zoom: 0, radius: 500 },
  { zoom: 3, radius: 250 }, 
  { zoom: 5, radius: 25 }
]

// global cached
let gridStatesAtZoom = {}

// add post function to export
const addPostNode = node => {
  setGridState()
}

// cheating / shortcut D:
const setGridState = () =>
  Post.findAll()
    .then(posts => {
      zoomRadius.map(z => {
        z.nodes = newGridState(posts, z.radius)
        return z
      }).forEach(z => gridStatesAtZoom[z.zoom] = z)
    })

setGridState()

router.get('/', (req, res, next) => {
  return res.send(gridStatesAtZoom)
})

module.exports = {
  router,
  addPostNode
}
