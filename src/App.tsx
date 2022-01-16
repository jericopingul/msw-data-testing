import { ChakraProvider } from '@chakra-ui/react';
import Dogs from './components/Dogs';
import './App.css';
import { setupBrowserMock } from './mocks';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

setupBrowserMock();

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Dogs />
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
