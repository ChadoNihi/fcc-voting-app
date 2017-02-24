import express from 'express';
import Inferno from 'inferno';
import { renderToString } from 'inferno-server';
import { Provider } from 'inferno-redux';
import { match, RouterContext } from 'inferno-router';
import path from 'path';
import routes from './routes';
import configureStore from './store/configureStore';
import {isDuplicatePoll, isValidPoll_Title_Opts, loggedIn } from './utils';

const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

const pollsCollName = process.env.POLLS_COLLECTION_NAME,
      usersCollName = process.env.USERS_COLLECTION_NAME;

let db;

MongoClient.connect(process.env.MONGO_URI, (err, _db) => {
  if (err) throw err;

  db = _db;

  const port = process.env.PORT || 8080;
  const app = express();
  const bodyParser = require('body-parser');

  app.use(bodyParser.json());
  app.use(express.static('public'));

  app.post('/poll', loggedIn, (req, res) => {
    let poll = req.poll;
    if (isValidPoll_Title_Opts(poll) && !isDuplicatePoll(poll)) {
      db.collection(pollsCollName).insert({

      });
    }
  });

  app.use(handleRender);

  app.listen(port, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Listening on port '+port);
    }
  });
});

function handleRender(req, res) {
  const renderProps = match(routes, req.originalUrl);
  if (renderProps.redirect) {
    res.redirect(renderProps.redirect);
  } else if (renderProps) {
    let preloadedState = {};

    const store = configureStore(preloadedState);

    Promise.all([
      promiseUserFromDb(db, req).then(
        (user)=> {store.dispatch(addUser(user))},
        (err)=> {console.log('An error on querying a user: '+err);}
      ),
      promisePollsFromDb(db).then(
        (polls)=> {store.dispatch(setPolls(polls)); return polls;},
        (err)=> {console.log('An error on querying polls: '+err);}
      )
    ]).then(([_ignore, polls]) => {
      if (store.user) store.dispatch(setUserPolls(polls);
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      const html = renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>);

      const finalState = store.getState();

      res.status(200).send(renderFullPage(html, finalState));
    }).catch(error => {
        res.status(500).send(error.message);
    });
  } else {
    res.status(404).send('Not found');
  }
}

function getPollsFromDb(db, cb) {
  db.collection(pollsCollName).find().toArray((err, polls)=> {
    if (err) {
      cb(err);
    } else {
      cb(null, polls);
    }
  });
}

function getUserFromDb(db, provider, idByProvider, cb) {
  db.collection(usersCollName).findOne({provider: provider, idByProvider: idByProvider}, (err, user)=> {
		if (err) {
			cb(err);
		} else {
			// db.collection('polls').find({_id: {$in: user.pollsIds}}).toArray((err, polls)=> {
			// 	user.polls = polls;
			// 	res.json(user);
			// });
      cb(null, user);
		}
	});
}

function promisePollsFromDb(db) {
  return new Promise(function(resolve, reject) {
    getPollsFromDb(db, (err, polls)=> {
			if (err) {
        reject(err);
			} else {
				resolve(polls);
			}
		});
  });
}

function promiseUserFromDb(db, req) {
  return new Promise(function(resolve, reject) {
    if (req.user) {
      getUserFromDb(db, req.user.provider, req.user.id, (err, user)=> {
  			if (err) {
          reject(err);
  			} else {
  				resolve(user);
  			}
  		});
    } else {
      resolve(false);
    }
  });
}

function renderFullPage(html, preloadedState) {
 return `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Discs Test</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/picnicss/6.3.2/picnic.min.css" rel="stylesheet">
            <script async src="https://use.fontawesome.com/ade899c041.js"></script>
        </head>
        <body>
          <div id="app">${html}</div>
          <script>
            // WARNING: See the following for Security isues with this approach:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
          </script>
          <script src="/bundle.js"></script>
          <script>(function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
          </script>
        </body>
      </html>
      `;
}
