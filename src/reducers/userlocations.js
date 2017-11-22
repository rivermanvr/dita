import { SET_USER_LOCATIONS } from '../actions';
import _ from 'lodash'

const initialState = {
  pinnedLocations: [],
  home: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_LOCATIONS:
      return !_.isEmpty(action.userLocations) ? {
        pinnedLocations: action.userLocations,
        home: action.userLocations.find(location => location.isHome)
      } : initialState
    default:
      return state;
  }
};
