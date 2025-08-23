import {
  deleteChakki,
  getChakkiList,
  updateChakkiStatus,
} from '@/app/apis/apis';
import { showToast } from '@/app/shared/ToastMessage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UUID } from 'crypto';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IChakkiList } from './types';

const statusFilters = [
  { label: 'Status', value: 'all' },
  { label: 'Draft', value: 'draft' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
];

export const useHook = () => {
  const router = useRouter();
  const merchantFilters = [{ label: 'Merchants', value: 'all' }];

  const initialFilters = {
    q: '',
    status: statusFilters[0],
    merchantId: merchantFilters[0],
  };

  const initialPagination = { page: 1, limit: 10 };

  const [filters, setFilters] = useState(initialFilters);

  const [paginationData, setPaginationData] = useState(initialPagination);

  useEffect(() => {
    setPaginationData(initialPagination);
  }, [filters]);

  const modifiedFilters = {
    q: filters.q || undefined,
    status: filters.status.value !== 'all' ? [filters.status.value] : undefined,
    merchantId: filters.merchantId.value !== 'all' || undefined,
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
        typeof window !== 'undefined' && hasFilters
          ? window.btoa(JSON.stringify(modifiedFilters))
          : undefined,
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
        title: 'Chakki Activated',
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
    setFilters,
    deleteChakkiMutation,
    updateChakkiStatusMutation,
  };
};
