import { SET_GRID, ADD_TO_GRID } from '../actions'
import { cloneDeep } from 'lodash'

const MAXLAT = 90,
  MINLAT = -90,
  MAXLNG = 180,
  MINLNG = -180,
  buildGrid = latStep => {
    let startT = new Date()
    console.log('building grid')    

    // copy
    let latMax = MAXLAT,
      latMin = MINLAT,
      output = {}

    while(latMax >= latMin) {
      let lngMax = MAXLNG,
        lngMin = MINLNG

      while(lngMax >= lngMin) {
        output[`${latMax},${lngMax}`] = { nodes: [], averageHl: 0, count: 0 }
        lngMax -= latStep * 2
      }
      latMax -= latStep
    }

    let finT = new Date()
    console.log(`build complete in ${(finT-startT)}ms`)
    // delete output[0]
    return output
  },
  addToBucket = (post, grid) => {
    // return the [lat][lng] for the bucket
    let bucketLat = Math.round(post.latitude / LATSTEP, 1) * LATSTEP,
      bucketLng = Math.round(post.longitude / (LATSTEP * 2), 1) * LATSTEP * 2,
      bucketKey = `${bucketLat},${bucketLng}`,
      bucket = grid[bucketKey] || { nodes: [], averageHl: 0, count: 0 }

    let averageHl = (bucket.averageHl * bucket.count + post.halflife) / ++bucket.count

    // pushing to nodes is a little heavy
    return {
      [bucketKey]: {
        nodes: [ ...bucket.nodes, post ],
        count: bucket.count,
        averageHl
      }
    }
  },
  newGridState = (posts, grid) => {
    let startT = new Date()
    console.log('creating new grid state')

    let gridCopy = cloneDeep(grid)
    posts.forEach(post => {
      gridCopy = { ...gridCopy, ...addToBucket(post, gridCopy) }
    })

    let finT = new Date()
    console.log(`build complete in ${(finT-startT)}ms`)

    return gridCopy
  }

const LATSTEP = 10
const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GRID:
      return { ...state, ...newGridState(action.posts, state) }
    case ADD_TO_GRID:
      return { ...state, ...addToBucket(action.post, state) }
    default:
      return state
  }
}
