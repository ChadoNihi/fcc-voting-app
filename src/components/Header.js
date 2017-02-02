import Inferno from 'inferno';
import { IndexLink, Link } from 'inferno-router';

export default ({isLoggedIn}) => {
  return (
    <header className='header'>
      <nav className="demo">
        <IndexLink className="brand">
          <h1>Votely</h1>
        </IndexLink>

        {/*responsive*/}
        <input id="bmenub" type="checkbox" className="show">
        <label for="bmenub" className="burger pseudo button">&#8801;</label>

        <div className="menu">
          <IndexLink className="pseudo button">
            Home
          </IndexLink>
          {(isLoggedIn ? (
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
