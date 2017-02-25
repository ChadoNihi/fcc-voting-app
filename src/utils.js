'use strict';

import {pollOptMaxLen, pollOptMinLen, pollTitleMaxLen, pollTitleMinLen} from './constants';

module.exports = {
  loggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      req.flash('error', 'Please, log in first.');
      res.redirect('/');
    }
  },
  isDuplicatePoll(poll) { // TODO for production ;)
    return false;
  },
  isValidPoll_Title_Opts(poll) {
    try {
      return poll.title.length>=pollTitleMinLen &&
        poll.title.length<=pollTitleMaxLen &&
        poll.opts.length>0 &&
        poll.opts.every(opt=> opt.length > pollOptMinLen && opt.length <= pollOptMaxLen);
    } catch (e) {
      return false;
    }
  },
  ensureUnauthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      // display an "already logged in" message
      return res.redirect('/');
    }
    next();
  }
};
