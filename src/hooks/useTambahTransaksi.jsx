import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function useTambahTransaksi() {
  const queryClient = useQueryClient();

  function imitateAddTransaction() {
    return new Promise((resolve, reject) => {
      // Simulate an asynchronous operation (e.g., fetching data from a server)
      setTimeout(() => {
        const data = [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
          { id: 3, name: 'Item 3' },
        ];
        resolve(data); // Resolve with mock data after a delay
      }, 3000); // Simulate a 1-second delay
    });
  }

  const { mutate: tambahTransaksi, isPending: isCreating } = useMutation({
    mutationFn: imitateAddTransaction,
    onSuccess: () => {
      toast.success('Transaksi baru telah ditambah');
      queryClient.invalidateQueries({
        queryKey: ['transactions'],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { tambahTransaksi, isCreating };
}

export default useTambahTransaksi;
