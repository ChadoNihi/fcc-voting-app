const path = require('path'),
      GithubStrategy = require('passport-github').Strategy,
      TwitterStrategy = require('passport-twitter').Strategy,
      githubAuth = {
    		'clientID': process.env.GITHUB_KEY,
    		'clientSecret': process.env.GITHUB_SECRET,
    		'callbackURL': path.join(process.env.APP_URL, 'auth/github/cb')
	    },
	    twitterAuth = {
    		'consumerKey': process.env.TWITTER_CONSUMER_KEY,
    	  'consumerSecret': process.env.TWITTER_CONSUMER_SECRET,
    	  'callbackURL': path.join(process.env.APP_URL, "auth/twitter/cb")
      };
module.exports = function (passport) {

  passport.use(new GithubStrategy({
      clientID: githubAuth.clientID ,
      clientSecret: githubAuth.clientSecret ,
      callbackURL: githubAuth.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  ));
}
