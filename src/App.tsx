import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Layout from './components/layout/Layout';
import GlobalStyles from './styles/GlobalStyles';
import Router from './Router';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <Layout>
        <Router />
      </Layout>
    </QueryClientProvider>
  );
}
