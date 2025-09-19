import {
  removeUserAsMerchant,
  searchMerchants,
  updateMerchantStatus,
} from '@/app/apis/apis';
import { showToast } from '@/app/shared/ToastMessage';
import { getEncodedFilters } from '@/app/utils/constants';
import { Status } from '@/app/utils/enum';
import useDebounce from '@/app/utils/hooks/useDebounce';
import { IMerchant } from '@/app/utils/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UUID } from 'crypto';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

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

  const [filters, setFilters] = useState(initialFilters);

  const params = useSearchParams();

  const limit = Number(params.get('limit') || 10);
  const page = Number(params.get('page') || 1);

  const [isAddMerchant, setIsAddMerchant] = useState<{
    name: string;
    phone: string;
    email: string;
  } | null>(null);

  const debouncedSearch = useDebounce(filters.q, 300);

  const modifiedFilters = {
    q: debouncedSearch,
    status: filters.status.value !== 'all' ? [filters.status.value] : undefined,
  };

  const hasFilters = Object.values(modifiedFilters).filter(Boolean).length;

  const {
    data: merchantList = [],
    isFetching: isFetchingMerchants,
    refetch: refetchMerchants,
  } = useQuery<IMerchant[]>({
    queryKey: ['searchMerchantList', modifiedFilters, limit, page],
    queryFn: () =>
      searchMerchants(getEncodedFilters(modifiedFilters), page, limit),
  });

  const { mutate: removeAsMerchantMutation } = useMutation({
    mutationFn: (merchantId: UUID) => removeUserAsMerchant(merchantId),
    onSuccess: () => {
      refetchMerchants();
      showToast({
        title: 'Merchant removed successfully',
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

  const { mutate: updateMerchantStatusMutation } = useMutation({
    mutationFn: (data: { merchantId: UUID; status: string }) =>
      updateMerchantStatus(data.merchantId, {
        status: data.status,
      }),
    onSuccess: () => {
      refetchMerchants();
      showToast({
        title: 'Updated Merchant Status',
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
    merchantList,
    isFetchingMerchants,
    filters,
    hasFilters,
    initialFilters,
    statusFilters,
    isAddMerchant,
    setIsAddMerchant,
    setFilters,
    removeAsMerchantMutation,
    updateMerchantStatusMutation,
    refetchMerchants,
  };
};
