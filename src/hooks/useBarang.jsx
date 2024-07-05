import { useQuery } from '@tanstack/react-query';
import { getAllProducts, getSpecificProduct } from '../services/apiBarang';

function useBarang(id) {
  const {
    isPending,
    data: barang,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: id ? () => getSpecificProduct(id) : getAllProducts,
  });

  return { barang, isPending, error };
}

export default useBarang;
