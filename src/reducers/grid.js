import { SET_GRID, ADD_TO_GRID } from '../actions'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GRID:
      return action.grid
    case ADD_TO_GRID:
      return state
      // return { ...state, ...addToBucket(action.post, state) }
    default:
      return state
  }
}
