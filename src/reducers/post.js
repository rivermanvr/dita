import { GET_POST } from '../actions';

// Initial state
const initialState = {
  post: {}
}

// Reducer
export default (state=initialState, action) => {
  switch(action.type){
    case GET_POST:
      return { ...state, post: action.post }

    default: 
      return state;
  }
}