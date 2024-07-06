import { useQuery } from '@tanstack/react-query';
import { getSpecificRestock } from '../services/apiStok';

function useStok(id) {
  const {
    isPending,
    data: stok,
    error,
  } = useQuery({
    queryKey: ['stock'],
    queryFn: () => getSpecificRestock(id),
  });

  return { stok, isPending, error };
}

export default useStok;
