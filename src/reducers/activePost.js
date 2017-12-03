import { SET_ACTIVE_POST } from '../actions';

const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_POST:
      return action.postId
    default:
      return state;
  }
};
