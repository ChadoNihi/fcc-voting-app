import Inferno from 'inferno';
import { IndexLink, Link } from 'inferno-router';
import { connect } from 'inferno-redux';

import {pollEditorModalId} from '../constants';
import PollEditor from './PollEditor';

const Header = ({user}) => {
  return (
    <header className='header'>
      <nav className="demo">
        <IndexLink className="brand">
          <h1>Votely</h1>
        </IndexLink>
        <IndexLink className="pseudo button">
          Home
        </IndexLink>

        {/*responsive*/}
        <input id="bmenub" type="checkbox" className="show" />
        <label for="bmenub" className="burger pseudo button">&#8801;</label>

          {(user ? (
            <div className="menu">
              <label for={pollEditorModalId} className="button">Create Poll</label>
              <div className="modal">
                <input id={pollEditorModalId} type="checkbox" />
                <label for={pollEditorModalId} className="overlay"></label>
                <article>
                  <header>
                    <h3>New Poll</h3>
                    <label for={pollEditorModalId} className="close">&times;</label>
                  </header>
                  <section className="content">
                    <PollEditor pollEditorModalId={pollEditorModalId} />
                  </section>
                </article>
              </div>
              <a href="/logout" className="pseudo button">Logout</a>
            </div>
          ) : (
            <div className="menu">
              <span>Log in to <strong>Create a Poll</strong></span>
              <a href="/auth/twitter" className="pseudo button">Twitter</a>
              <a href="/auth/github" className="pseudo button">GitHub</a>
            </div>
          ))}
      </nav>
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const TheHeader = connect(
    mapStateToProps
)(Header);

export default TheHeader;
