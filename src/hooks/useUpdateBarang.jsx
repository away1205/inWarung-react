import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '../services/apiBarang';
import toast from 'react-hot-toast';

function useUpdateBarang() {
  const queryClient = useQueryClient();

  const { mutate: updateBarang, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onSuccess: () => {
      toast.success('Barang baru telah ditambah');
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateBarang, isUpdating };
}

export default useUpdateBarang;
