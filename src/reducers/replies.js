import {POST_REPLY} from '../actions'

const initialState = []

export default (state = initialState, action) => {
    switch(action.type){
        case POST_REPLY:
          return action.posts
        default:
          return state
    }
}