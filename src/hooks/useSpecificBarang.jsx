import { useQuery } from '@tanstack/react-query';
import { getSpecificProduct } from '../services/apiBarang';

function useSpecificBarang(id) {
  const {
    isPending,
    data: barang,
    error,
  } = useQuery({
    queryKey: ['specific_product'],
    queryFn: () => getSpecificProduct(id),
  });

  return { barang, isPending, error };
}

export default useSpecificBarang;
