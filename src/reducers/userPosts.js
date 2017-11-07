import { SET_USER_POSTS } from '../actions';
import _ from 'lodash'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_POSTS:
      return !_.isEmpty(action.userPosts) ? action.userPosts : []
    default:
      return state;
  }
};
