import Inferno from 'inferno';
import { renderToString } from 'inferno-server';
import {Provider} from 'inferno-redux';
import { match, RouterContext } from 'inferno-router';
import path from 'path';
import routes from './routes';
import configureStore from './store/configureStore';

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(process.env.MONGO_URI, (err, db) => {
  
})

const port = process.env.PORT || 8080;
const app = express();

app.use(Express.static('public'));
app.use(handleRender);
function handleRender(req, res) {
  const renderProps = match(routes, req.originalUrl);
  if (renderProps.redirect) {
    res.redirect(renderProps.redirect);
  } else if (renderProps) {

    fetchPolls().then(polls => {

      let preloadedState = {};

      const store = configureStore(preloadedState);
      store.dispatch(getDataSuccess(discs));

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
        </head>
        <body>
          <div id="app">${html}</div>
          <script>
            // WARNING: See the following for Security isues with this approach:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
          </script>
          <script src="/bundle.js"></script>
        </body>
      </html>
      `;
}

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://127.0.0.1:${port}`);
  }
});
