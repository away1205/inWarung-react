import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../services/apiBarang';

function useBarang() {
  const {
    isPending,
    data: barang,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  return { barang, isPending, error };
}

export default useBarang;
