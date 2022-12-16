import Layout from './components/layout/Layout';
import GlobalStyles from './styles/GlobalStyles';
import Router from './Router';

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Layout>
        <Router />
      </Layout>
    </>
  );
}
