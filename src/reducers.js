import {combineReducers} from 'redux';
import update from 'immutability-helper';

import * as a from "./actions/actionTypes.js";

const mainReducer = (state = {}, action)=> {
  switch (action.type) {
    case a.ADD_POLL_TO_POLLS:
      return update(state, {polls: {$push: action.poll}});
    case a.ADD_POLL_TO_USER:
      return update(state, {user: {polls: {$push: action.poll}}});
    case a.ADD_USER:
      return Object.assign({}, state, {user: action.user});
    default:
      return state;
  }
};

const reducer = combineReducers({
    mainReducer
});

export default reducer;
