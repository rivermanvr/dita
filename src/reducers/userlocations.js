import { SET_USER_LOCATIONS } from '../actions';
import _ from 'lodash'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOCATIONS:
      return !_.isEmpty(action.userLocations) ? action.userLocations : initialState
    default:
      return state;
  }
};
