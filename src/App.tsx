import { ChakraProvider } from '@chakra-ui/react';
import Dogs from './components/Dogs';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Dogs />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
