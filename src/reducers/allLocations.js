import { GET_ALL_LOCATIONS } from '../actions';

// Reducer
export default (state = [], action) => {
  switch(action.type){
    case GET_ALL_LOCATIONS: 
      return action.allLocations
    default:
      return state;
  }
}
