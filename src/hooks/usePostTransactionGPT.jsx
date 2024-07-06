import { getTransactionFromGPT } from '../services/apiSpeechToText';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function usePostTransactionGPT() {
  const queryClient = useQueryClient();

  const {
    mutate: postTransactionGPT,
    isPending,
    error,
  } = useMutation({
    mutationFn: getTransactionFromGPT,
    onSuccess: () => {
      toast.success('Tabel dari GPT telah ditambah');
      queryClient.invalidateQueries({
        queryKey: ['transaction'],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { postTransactionGPT, isPending, error };
}

export default usePostTransactionGPT;
