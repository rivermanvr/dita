import { GET_IDEAS } from '../actions';

// Initial state
const initialState = {
  ideas: [],
  newIdea: {}
}

// Reducer
export default (state=initialState, action) => {
  switch(action.type){
    case GET_IDEAS: 
      return { ...state, ideas: action.idea }

    default:
      return state;
  }
}