import {SET_MODAL} from '../actions'
const initialState = false

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_MODAL:
          return !state
        default:
          return state
    }
}