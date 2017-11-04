import { SET_CURRENT_USER } from '../actions';
import _ from 'lodash'

const initialState = {
  user: {},
  isAuthenticated: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !_.isEmpty(action.user),
        user: action.user || initialState.user
      }
    default:
      return state;
  }
};
