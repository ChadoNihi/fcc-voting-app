import Inferno from 'inferno';
import {Route, IndexRoute} from 'inferno-router';
import App from './components/App';
import Polls from './components/Polls';
import PollPage from './components/PollPage';
import UserPage from './components/UserPage';
import NotFound from './components/NotFound';


export default (
    <Route component={App}>
        <IndexRoute component={ Polls } />
        <Route path="polls/:poll" component={ PollPage }/>
        <Route path='polls' component={ Polls } />
        <Route path="users/:username" component={ UserPage }/>
        <Route path="*" component={ NotFound }/>
    </Route>
);
