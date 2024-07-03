import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DaftarInventaris from './pages/DaftarInventaris';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>HomePage</h1>} />
          <Route path='inventaris' element={<DaftarInventaris />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
