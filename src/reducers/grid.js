import { SET_GRID, ADD_TO_GRID } from '../actions'
import { cloneDeep } from 'lodash'

const MAXLAT = 90,
  MINLAT = -90,
  MAXLNG = 180,
  MINLNG = -180,
  addToBucket = (post, grid, step) => {
    // return the [lat][lng] for the bucket
    let bucketLat = Math.round(post.latitude / step, 1) * step,
      bucketLng = Math.round(post.longitude / (step * 2), 1) * step * 2,
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

    let gridCopyMid = cloneDeep(grid.zoomMid),
      gridCopyHigh = cloneDeep(grid.zoomHigh)

    posts.forEach(post => {
      gridCopyMid = { ...gridCopyMid, ...addToBucket(post, gridCopyMid, LATSTEPMID) }
      gridCopyHigh = { ...gridCopyHigh, ...addToBucket(post, gridCopyHigh, LATSTEPHIGH) }
    })

    let finT = new Date()
    console.log(`build complete in ${(finT-startT)}ms`)

    return { zoomMid: gridCopyMid, zoomHigh: gridCopyHigh }
  }

const LATSTEPMID = 1
const LATSTEPHIGH = 4
const initialState = { zoomMid: {}, zoomHigh: {} }

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
