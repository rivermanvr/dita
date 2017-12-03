import { GET_USERS } from '../actions';

// Reducer
export default (state = [], action) => {
  switch(action.type){
    case GET_USERS: 
      return action.users
    default:
      return state;
  }
}
