import { GET_POSTS } from '../actions';

// Initial state
const initialState = {
  posts: []
}

// Reducer
export default (state=initialState, action) => {
  switch(action.type){
    case GET_POSTS: 
      return { ...state, posts: action.posts }

    default:
      return state;
  }
}