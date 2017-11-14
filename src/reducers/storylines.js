import { GET_STORYLINES } from '../actions';

// Reducer
export default (state=[], action) => {
  switch(action.type){
    case GET_STORYLINES: 
      return action.storylines

    default:
      return state;
  }
}