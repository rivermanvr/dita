import { SET_GRID, ADD_TO_GRID, calcDistance } from '../actions'
import { cloneDeep } from 'lodash'

const MAXLAT = 90,
  MINLAT = -90,
  MAXLNG = 180,
  MINLNG = -180,
  newGridState = (posts) => {
    let startT = new Date()
    console.log('creating new map')

    let uniMap = posts.map((post, i) => {
      // search vertices
      let lat = post.latitude,
        lon = post.longitude

      post.vertices = []

      posts.slice(i + 1).forEach(p => {
        if (calcDistance(lat, lon, p.latitude, p.longitude) < RADIUS) {
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
  }

const RADIUS = 25;
const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GRID:
      return newGridState(action.posts)
    case ADD_TO_GRID:
      return state
      // return { ...state, ...addToBucket(action.post, state) }
    default:
      return state
  }
}
