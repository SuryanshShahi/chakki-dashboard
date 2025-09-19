import {
  deleteProduct,
  getProductList,
  updateProductStatus,
} from '@/app/apis/apis';
import { showToast } from '@/app/shared/ToastMessage';
import { getEncodedFilters } from '@/app/utils/constants';
import { Status } from '@/app/utils/enum';
import useDebounce from '@/app/utils/hooks/useDebounce';
import { useMutation, useQuery } from '@tanstack/react-query';
import { UUID } from 'crypto';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { IProductList } from './types';

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

  const params = useParams();
  const chakkiId = params.id as UUID;

  const queryParams = useSearchParams();

  const [filters, setFilters] = useState(initialFilters);

  const debouncedSearch = useDebounce(filters.q, 300);

  const modifiedFilters = {
    q: debouncedSearch,
    status: filters.status.value !== 'all' ? [filters.status.value] : undefined,
  };

  const limit = Number(queryParams.get('limit') || 10);
  const page = Number(queryParams.get('page') || 1);

  const hasFilters = Object.values(modifiedFilters).filter(Boolean).length;

  const {
    data: productList = [],
    isLoading,
    refetch: refetchProducts,
  } = useQuery<IProductList[]>({
    queryKey: ['productList', modifiedFilters, limit, page],
    queryFn: () =>
      getProductList(chakkiId, getEncodedFilters(modifiedFilters), page, limit),
  });

  const { mutate: deleteProductMutation } = useMutation({
    mutationFn: (productId: UUID) => deleteProduct(chakkiId, productId),
    onSuccess: () => {
      refetchProducts();
      showToast({
        title: 'Product Deleted Successfully',
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

  const { mutate: updateProductStatusMutation } = useMutation({
    mutationFn: (data: { productId: UUID; status: string }) =>
      updateProductStatus(chakkiId, data.productId, {
        status: data.status,
      }),
    onSuccess: () => {
      refetchProducts();
      showToast({
        title: 'Updated Product Status',
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
    productList,
    isLoading,
    filters,
    hasFilters,
    initialFilters,
    statusFilters,
    chakkiId,
    setFilters,
    deleteProductMutation,
    updateProductStatusMutation,
  };
};
