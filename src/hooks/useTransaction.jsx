import { useQuery } from '@tanstack/react-query';
import { getTransactionFromGPT } from '../services/apiSpeechToText';

export function useTransactionGPT(prompt) {
  const {
    isPending,
    data: transaction,
    error,
  } = useQuery({
    queryKey: ['transaction'],
    queryFn: () => getTransactionFromGPT(),
  });

  return { isPending, error, transaction };
}
