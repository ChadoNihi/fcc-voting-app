import Inferno from 'inferno';
import { IndexLink, Link } from 'inferno-router';
import PollEditor from './PollEditor';

export default ({isLoggedIn}) => {
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
          {(isLoggedIn ? (
            <label for="poll-editor-modal" className="button">Create Poll</label>
            <div className="modal">
              <input id="poll-editor-modal" type="checkbox" />
              <label for="poll-editor-modal" className="overlay"></label>
              <article>
                <header>
                  <h3>New Poll</h3>
                  <label for="poll-editor-modal" className="close">&times;</label>
                </header>
                <section className="content">
                  <PollEditor />
                </section>
              </article>
            </div>
            <a href="/logout" className="pseudo button">Logout</a>
          ) : (
            <span>Log in with</span>
            <a href="/auth/twitter" className="pseudo button">Twitter</a>
            <a href="/auth/github" className="pseudo button">GitHub</a>
          ))}
        </div>
      </nav>
    </header>
  );
}
