import { GET_POSTS } from '../actions';

// Reducer
export default (state=[], action) => {
  switch(action.type){
    case GET_POSTS: 
      return action.posts

    default:
      return state;
  }
}
