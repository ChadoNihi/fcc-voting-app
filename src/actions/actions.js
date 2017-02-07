import * as a from './actionTypes.js';

export const addPollToPolls = (poll)=>
  ({type: a.ADD_POLL_TO_POLLS, poll});
export const addPollToUser = (poll)=>
  ({type: a.ADD_POLL_TO_USER, poll});
export const addUser = (user)=>
  ({type: a.ADD_USER, user});
