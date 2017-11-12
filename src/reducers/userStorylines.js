import { SET_USER_STORYLINES } from '../actions';
import _ from 'lodash'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_STORYLINES:
      return !_.isEmpty(action.userStorylines) ? action.userStorylines : []
    default:
      return state;
  }
};
