const GithubStrategy = require('passport-github').Strategy,
      TwitterStrategy = require('passport-twitter').Strategy,
      githubAuth = {
    		'clientID': process.env.GITHUB_KEY,
    		'clientSecret': process.env.GITHUB_SECRET,
    		'callbackURL': process.env.APP_URL + 'auth/github/cb'
	    },
	    twitterAuth = {
    		'consumerKey': process.env.TWITTER_CONSUMER_KEY,
    	  'consumerSecret': process.env.TWITTER_CONSUMER_SECRET,
    	  'callbackURL': process.env.APP_URL + "auth/twitter/cb"
      };

passport.use(new GithubStrategy({
    clientID: githubAuth. ,
    clientSecret: githubAuth. ,
    callbackURL: githubAuth.
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));
