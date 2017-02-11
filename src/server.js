import express from 'express';
import Inferno from 'inferno';
import { renderToString } from 'inferno-server';
import { Provider } from 'inferno-redux';
import { match, RouterContext } from 'inferno-router';
import path from 'path';
import routes from './routes';
import configureStore from './store/configureStore';
import { loggedIn } from './utils';

const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

MongoClient.connect(process.env.MONGO_URI, (err, db) => {
  if (err) throw err;

  const port = process.env.PORT || 8080;
  const app = express();

  app.use(express.static('public'));

  app.post('/poll', loggedIn, (req, res) => {

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
      promiseUserFromDb(req).then((user)=> store.dispatch(fetchUser())),
      store.dispatch(fetchPolls())
    ]).then(() => {
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
