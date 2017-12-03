// actions
// setGrid(bulk posts), initialLoad
// addToGrid(post with lat,lng), on add post

// ***** ACTION TYPES *****
export const SET_GRID = 'SET_GRID',
  ADD_TO_GRID = 'ADD_TO_GRID'

// ***** ACTION CREATORS *****
export const setGrid = posts => ({ type: SET_GRID, posts })
export const addToGrid = post => ({ type: ADD_TO_GRID, post })
