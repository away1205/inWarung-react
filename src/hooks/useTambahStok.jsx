import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createRestock } from '../services/apiStok';

function useTambahStok() {
  const queryClient = useQueryClient();

  const { mutate: tambahStok, isPending: isCreating } = useMutation({
    mutationFn: createRestock,
    onSuccess: () => {
      toast.success('Stock telah ditambah');
      queryClient.invalidateQueries({
        queryKey: ['stock'],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { tambahStok, isCreating };
}

export default useTambahStok;
