import Inferno from 'inferno';

export default (props) => {
  return (
    <footer className='footer'>
      <div>
        <li>Built by eFish (aka Chado Nihi)</li>
      </div>
      <div>
        <ul>
          <li>Find me on:</li>
          <li><a target='_blank' href="https://twitter.com/ChadoNihi"><i className="fa fa-twitter fa-lg" aria-hidden="true"></i></a></li>
          <li><a target='_blank' href="https://www.facebook.com/chado.nihi"><i className="fa fa-facebook fa-lg" aria-hidden="true"></i></a></li>
          <li><a target='_blank' href="https://github.com/ChadoNihi"><i className="fa fa-github fa-lg" aria-hidden="true"></i></a></li>
          <li><a target='_blank' href="https://fi.linkedin.com/in/chadon"><i className="fa fa-linkedin fa-lg" aria-hidden="true"></i></a></li>
        </ul>
      </div>
    </footer>
  );
}
