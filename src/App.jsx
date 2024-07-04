import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import DaftarInventaris from './pages/DaftarInventaris';
import { Toaster } from 'react-hot-toast';
import Transaksi from './pages/Transaksi';
import AppLayout from './ui/AppLayout';
import Rekomendasi from './pages/Rekomendasi';
import Dashboard from './pages/Dashboard';
import Profil from './pages/Profil';

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

          <Route element={<AppLayout />}>
            <Route path='inventaris' element={<DaftarInventaris />} />
            <Route path='transaksi' element={<Transaksi />} />
            <Route path='profil' element={<Profil />} />
            <Route path='rekomendasi' element={<Rekomendasi />} />
            <Route path='dashboard' element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ mragin: '8px' }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'var(--color-grey-0)',
            color: 'var(--color-grey-700)',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
