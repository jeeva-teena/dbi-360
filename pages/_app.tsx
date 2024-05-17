import "../styles.css";
import { TinaCMS, TinaProvider } from 'tinacms';


const cms = new TinaCMS();

const App = ({ Component, pageProps }) => {
  return (
    <TinaProvider cms={cms}>
      <Component {...pageProps} />
    </TinaProvider>
  );
};

export default App;
