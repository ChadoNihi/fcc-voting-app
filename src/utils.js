'use strict';

module.exports = {
  loggedIn(req, res, next) {
    if (req.user) {
      next();
    } else {
      req.flash('error', 'Please, log in first.');
      res.redirect('/');
    }
  },
  isValidPoll(poll) {
    try {
      return poll.title.trim().length>2 && poll.opts.length>0 && poll.opts.every(opt=> opt.trim());
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
