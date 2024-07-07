import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getForecastStock } from '../services/apiForecast';

function useForecastStock() {
  const queryClient = useQueryClient();

  const {
    mutate: forecastStock,
    isPending,
    error,
  } = useMutation({
    mutationFn: getForecastStock,
    onSuccess: () => {
      toast.success('Forecast telah digenerate');
      queryClient.invalidateQueries({
        queryKey: ['forecast'],
      });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { forecastStock, isPending, error };
}

export default useForecastStock;
