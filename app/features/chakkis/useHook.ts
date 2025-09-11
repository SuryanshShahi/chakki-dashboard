import {
  deleteChakki,
  getChakkiList,
  updateChakkiStatus,
} from '@/app/apis/apis';
import { showToast } from '@/app/shared/ToastMessage';
import { getEncodedFilters } from '@/app/utils/constants';
import { Status } from '@/app/utils/enum';
import useDebounce from '@/app/utils/hooks/useDebounce';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UUID } from 'crypto';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IChakkiList } from './types';

const statusFilters = [
  { label: 'All', value: 'all' },
  { label: 'Draft', value: Status.DRAFT },
  { label: 'Active', value: Status.ACTIVE },
  { label: 'Inactive', value: Status.INACTIVE },
];

const initialFilters = {
  q: '',
  status: statusFilters[0],
};

export const useHook = () => {
  const router = useRouter();

  const initialPagination = { page: 1, limit: 10 };

  const [filters, setFilters] = useState(initialFilters);
  const [paginationData, setPaginationData] = useState(initialPagination);

  useEffect(() => {
    setPaginationData(initialPagination);
  }, [filters]);

  const debouncedSearch = useDebounce(filters.q, 300);

  const modifiedFilters = {
    q: debouncedSearch,
    status: filters.status.value !== 'all' ? [filters.status.value] : undefined,
  };

  const hasFilters = Object.values(modifiedFilters).filter(Boolean).length;

  const {
    data: chakkiList = { data: [] },
    isLoading,
    refetch: refetchChakkis,
  } = useQuery<{
    data: IChakkiList[];
  }>({
    queryKey: [
      'chakkiList',
      modifiedFilters,
      paginationData?.limit,
      paginationData.page,
    ],
    queryFn: () =>
      getChakkiList(
        getEncodedFilters(modifiedFilters),
        paginationData.page,
        paginationData.limit
      ),
  });

  const { mutate: deleteChakkiMutation } = useMutation({
    mutationFn: (chakkiId: UUID) => deleteChakki(chakkiId),
    onSuccess: () => {
      refetchChakkis();
      showToast({
        title: 'Chakki Deleted Successfully',
        type: 'success',
      });
    },
    onError: (err: any) => {
      showToast({
        title: err?.response?.data?.response?.message,
        type: 'error',
      });
    },
    onSettled: () => {},
  });

  const { mutate: updateChakkiStatusMutation } = useMutation({
    mutationFn: (data: { chakkiId: UUID; status: string }) =>
      updateChakkiStatus(data.chakkiId, {
        status: data.status,
      }),
    onSuccess: () => {
      refetchChakkis();
      showToast({
        title: 'Updated Chakki Status',
        type: 'success',
      });
    },
    onError: (err: any) => {
      showToast({
        title: err?.response?.data?.response?.message,
        type: 'error',
      });
    },
    onSettled: () => {},
  });

  return {
    router,
    chakkiList,
    isLoading,
    filters,
    hasFilters,
    initialFilters,
    statusFilters,
    setFilters,
    deleteChakkiMutation,
    updateChakkiStatusMutation,
  };
};
