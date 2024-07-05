import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/apiKategori';

function useKategori() {
  const {
    isPending,
    data: kategori,
    error,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  return { kategori, isPending, error };
}

export default useKategori;
