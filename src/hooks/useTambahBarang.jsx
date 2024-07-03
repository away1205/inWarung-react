import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../services/apiBarang';
import toast from 'react-hot-toast';

function useTambahBarang() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success('Barang baru telah ditambah');
      queryClient.invalidateQueries({
        queryKey: ['barang'],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createCabin, isCreating };
}

export default useTambahBarang;
