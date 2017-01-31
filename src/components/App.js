import Inferno from 'inferno';

import Header from './Header';
import Footer from './Footer';

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
