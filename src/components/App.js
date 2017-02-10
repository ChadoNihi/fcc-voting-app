import Inferno from 'inferno';
//import { connect } from 'inferno-redux';

import {addPollToPolls, addPollToUser} from '../actions/actions';

import Header from './Header';
import Footer from './Footer';
import SharePanel from './SharePanel';

const App = (props) => {
  return (
    <div>
      <Header />
      <main>
        {props.children}
      </main>
      <Footer />
    </div>
  );
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addPollToPolls: (poll) => dispatch(addPollToPolls(poll)),
//     addPollToUser: (poll) => dispatch(addPollToUser(poll))
//   }
// }
//
// const mapStateToProps = (state) => {
//   return {
//     polls: state.polls,
//     user: state.user
//   };
// }
//
// const TheApp = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(App);

export default App;
