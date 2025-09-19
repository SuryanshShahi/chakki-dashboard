import { getDashboardStats } from '@/app/apis/apis';
import { IDashboardStats } from '@/app/utils/types';
import { useQuery } from '@tanstack/react-query';

const useHook = () => {
  const { data, isLoading } = useQuery<IDashboardStats>({
    queryKey: ['dashboardStats'],
    queryFn: () => getDashboardStats(),
  });

  return {
    data,
    isLoading,
  };
};

export default useHook;
