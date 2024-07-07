import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '../services/apiBarang';
import toast from 'react-hot-toast';

function useDeleteBarang() {
  const queryClient = useQueryClient();

  const { mutate: deleteBarang, isPending: isDeleting } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success('Barang telah dihapus');
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },

    onError: () => {
      toast.error('Barang tidak dapat dihapus');
    },
  });

  return { deleteBarang, isDeleting };
}

export default useDeleteBarang;
