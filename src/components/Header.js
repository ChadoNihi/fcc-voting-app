import Inferno from 'inferno';
import { IndexLink, Link } from 'inferno-router';

import {pollEditorModalId} from '../constants';
import PollEditor from './PollEditor';

const Header = ({user}) => {
  return (
    <header className='header'>
      <nav className="demo">
        <IndexLink className="brand">
          <h1>Votely</h1>
        </IndexLink>

        {/*responsive*/}
        <input id="bmenub" type="checkbox" className="show" />
        <label for="bmenub" className="burger pseudo button">&#8801;</label>

        <div className="menu">
          <IndexLink className="pseudo button">
            Home
          </IndexLink>
          {(user ? (
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
          ) : (
            <span>Log in to <strong>Create a Polls</strong></span>
            <a href="/auth/twitter" className="pseudo button">Twitter</a>
            <a href="/auth/github" className="pseudo button">GitHub</a>
          ))}
        </div>
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

export default Header;
