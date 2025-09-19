import { getChakkiDetails } from '@/app/apis/apis';
import { useQuery } from '@tanstack/react-query';
import { UUID } from 'crypto';
import { IChakkiDetails } from '../types';

export function useHook({ chakkiId }: { chakkiId: UUID }) {
  const { data: chakkiDetails, isLoading: isLoadingChakkis } =
    useQuery<IChakkiDetails>({
      queryKey: ['chakkiDetails', chakkiId],
      queryFn: () => getChakkiDetails(chakkiId as UUID),
      enabled: !!chakkiId,
      refetchOnMount: true,
    });

  return {
    chakkiDetails,
    isLoadingChakkis,
  };
}
