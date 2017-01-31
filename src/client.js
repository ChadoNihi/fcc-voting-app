import Inferno from 'inferno';
import configureStore from './store/configureStore';
import { createBrowserHistory } from 'history';
import {Provider} from 'inferno-redux';
import {Router, Route, IndexRoute} from 'inferno-router';

import routes from './routes';
import App from './components/App';

const browserHistory = createBrowserHistory();

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);
//store.dispatch(loadData());

Inferno.render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('app')
);
