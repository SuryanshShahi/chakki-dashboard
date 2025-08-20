import { getChakkiList } from '@/app/apis/apis';
import { useQuery } from '@tanstack/react-query';
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

  const { data: chakkiList = { data: [] }, isLoading } = useQuery<{
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

  return {
    router,
    chakkiList,
    isLoading,
    filters,
    hasFilters,
    setFilters,
    initialFilters,
  };
};
