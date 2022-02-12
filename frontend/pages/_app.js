import '../styles/globals.css'
import ContextProvider from '../lib/contexts'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  );
}

export default MyApp;
