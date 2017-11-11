import { GET_STORYLINES } from '../actions';

// Initial state
const initialState = {
  storylines: []
}

// Reducer
export default (state=initialState, action) => {
  switch(action.type){
    case GET_STORYLINES: 
      return { ...state, storylines: action.storylines }

    default:
      return state;
  }
}