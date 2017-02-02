import Inferno from 'inferno';

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
