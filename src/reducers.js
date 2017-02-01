import {combineReducers} from 'redux';

import * as a from "./actions/actionTypes.js";

const mainReducer = (state = {}, action)=> {
  switch (action.type) {
    case a.CHANGE_HERO_IN_FOCUS:
      return Object.assign({}, state, {heroInFocus: action.id});
    case a.CHANGE_DRAG_LOCK:
      return Object.assign({}, state, {isDragLocked: action.bool});
    case a.SET_HEROES:
      return Object.assign({}, state, {heroes: action.heroes});
    case a.SET_SORTBY:
      return Object.assign({}, state, {sortBy: action.sortBy});
    default:
      return state;
  }
};

const reducer = combineReducers({
    mainReducer
});

export default reducer;
