import {
  addChakki,
  addChakkiAddress,
  addChakkiImages,
  getActiveMerchantList,
  getChakkiDetails,
  updateChakki,
} from '@/app/apis/apis';
import { showToast } from '@/app/shared/ToastMessage';
import { IDropdown, Option } from '@/app/shared/dropdown';
import {
  ObjectUtils,
  determineSearchType,
  extractLatLng,
} from '@/app/utils/constants';
import useDebounce from '@/app/utils/hooks/useDebounce';
import { addChakkiSchema } from '@/app/utils/schemas';
import { IUser } from '@/app/utils/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { File } from 'buffer';
import { UUID } from 'crypto';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  IAddChakkiAddress,
  IAddChakkiPayload,
  IChakkiDetails,
  IOperationalHours,
  IUpdateChakki,
} from '../types';

export interface IInitialValue extends IAddChakkiPayload {
  images?: File[];
  merchant: IDropdown | null;
  link?: string;
  showExtraContactInfo?: boolean;
  selectedDays: number[];
  startTime?: string;
  endTime?: string;
  address?: {
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    mapLink?: string;
    landmark?: string;
  } | null;
}

export function useHook(chakkiId?: UUID) {
  const router = useRouter();
  const [merchantOptions, setMerchantOptions] = useState<Option[]>([]);
  const [isAddMerchant, setIsAddMerchant] = useState<{
    name?: string;
    phone?: string;
    email?: string;
  } | null>(null);

  const { data: chakkiDetails, isLoading: isLoadingChakkiDetails } =
    useQuery<IChakkiDetails>({
      queryKey: ['chakkiDetails', chakkiId],
      queryFn: () => getChakkiDetails(chakkiId as UUID),
      enabled: !!chakkiId,
    });

  const [searchKey, setSearchKey] = useState<string | undefined>(undefined);
  const debouncedSearchKey = useDebounce(searchKey, 400);

  const {
    data: merchantList,
    isFetching: isFetchMerchants,
    refetch: refetchMerchant,
  } = useQuery<{
    data: IUser[];
  }>({
    queryKey: ['activeMerchantList', debouncedSearchKey],
    queryFn: () =>
      getActiveMerchantList(
        1,
        10,
        debouncedSearchKey
          ? btoa(JSON.stringify({ q: debouncedSearchKey as string }))
          : undefined
      ),
    enabled: !chakkiId,
  });

  const initialValues: IInitialValue = {
    link: '',
    merchantId: chakkiDetails?.merchant?.id ?? undefined,
    merchant: chakkiDetails?.merchant
      ? {
          label: chakkiDetails?.merchant?.name,
          value: chakkiDetails?.merchant?.id as string,
        }
      : null,
    minOrderAmount: chakkiDetails?.minOrderValue ?? 0,
    images: [],
    showExtraContactInfo: false,
    selectedDays: [0, 1, 2, 3, 4, 5, 6],
    startTime: '09:00',
    endTime: '18:00',
    ...(chakkiDetails
      ? ObjectUtils.pick(chakkiDetails, [
          'name',
          'code',
          'isCustomerRequestAvailable',
          'operationalHours',
          'deliveryRangeInKms',
          'contactDetails',
          'externalStoreLinks',
        ])
      : { name: '', code: '' }),
  };

  const formikProps = useFormik({
    initialValues,
    validateOnMount: true,
    enableReinitialize: true,
    validateOnChange: true,
    onSubmit(values) {
      const operationalHours: IOperationalHours = {};
      values.selectedDays.forEach((d) => {
        operationalHours[d] = {
          startTime: values.startTime!,
          endTime: values.endTime!,
        };
      });
      const payload: IAddChakkiPayload = {
        merchantId: (values.merchant?.value as UUID) || values?.merchantId,
        ...ObjectUtils.pick(values, [
          'name',
          'code',
          'contactDetails',
          'isCustomerRequestAvailable',
          'minOrderAmount',
          'operationalHours',
          'isAcceptingOrders',
          'isAcceptingPickups',
          'externalStoreLinks',
          'deliveryRangeInKms',
        ]),
      };
      if (chakkiId) {
        updateChakkiMutation({
          chakkiId,
          payload,
        });
      } else {
        addChakkiMutation(payload);
      }
    },
    validationSchema: addChakkiSchema,
  });

  const { errors, values } = formikProps;

  const onCreateNewMerchant = (key: string) => {
    const searchType = determineSearchType(key);
    const defaultData = {
      [searchType]: key,
    };
    setIsAddMerchant(defaultData);
  };

  const { mutate: addChakkiImagesMutation } = useMutation({
    mutationFn: (data: { chakkiId: UUID; formData: FormData }) =>
      addChakkiImages(data.chakkiId, data.formData),
    onError: (err: any) => {
      showToast({
        title: err?.response?.data?.message,
        type: 'error',
      });
    },
  });

  const { mutate: addChakkiAddressMutation } = useMutation({
    mutationFn: (data: { chakkiId: UUID; payload: IAddChakkiAddress }) =>
      addChakkiAddress(data.chakkiId, data.payload),
    onError: (err: any) => {
      showToast({
        title: err?.response?.data?.message,
        type: 'error',
      });
    },
  });

  const addNewChakkiImages = (chakkiId: UUID) => {
    const formData = new FormData();
    values.images?.forEach((image) => {
      formData.append('images', image as Blob, image?.name);
    });

    addChakkiImagesMutation({
      chakkiId: chakkiId,
      formData,
    });
  };

  const { mutate: addChakkiMutation } = useMutation({
    mutationFn: (data: IAddChakkiPayload) => addChakki(data),
    onSuccess: (res) => {
      showToast({
        title: 'Chakki added successfully',
        type: 'success',
      });

      if (values.images?.length) {
        addNewChakkiImages(res?.data?.id);
      }

      if (values.address) {
        const payload: IAddChakkiAddress = {
          ...ObjectUtils.pick(values.address, [
            'addressLine1',
            'addressLine2',
            'addressLine3',
            'landmark',
          ]),
          latitude: extractLatLng(values.address.mapLink!)?.latitude || 0,
          longitude: extractLatLng(values.address.mapLink!)?.longitude || 0,
        };
        addChakkiAddressMutation({
          chakkiId: res?.data?.id,
          payload,
        });
      }

      router.replace('/chakkis');
    },
    onError: (err: any) => {
      showToast({
        title: err?.response?.data?.message,
        type: 'error',
      });
    },
  });

  const { mutate: updateChakkiMutation } = useMutation({
    mutationFn: (data: { chakkiId: UUID; payload: IUpdateChakki }) =>
      updateChakki(data.chakkiId, data.payload),
    onSuccess: (res) => {
      showToast({
        title: 'Chakki updated successfully',
        type: 'success',
      });

      if (values.images?.length) {
        addNewChakkiImages(res?.id);
      }

      router.replace(`/chakkis/${chakkiId}`);
    },
    onError: (err: any) => {
      showToast({
        title: err?.response?.data?.message,
        type: 'error',
      });
    },
  });

  useEffect(() => {
    const newOptions =
      merchantList?.data.map((m) => ({
        label: `${m.name} (${m.phone})`,
        value: m.id,
      })) || [];

    setMerchantOptions([
      ...newOptions,
      {
        label: `+ Add ${searchKey || ''}`,
        value: 'add-new',
      },
    ]);
  }, [merchantList, searchKey]);

  const isBtnDisabled = Boolean(Object.values(errors).length);

  return {
    isLoadingChakkiDetails,
    merchantList,
    isBtnDisabled,
    isFetchMerchants,
    formikProps,
    merchantOptions,
    isAddMerchant,
    setIsAddMerchant,
    onCreateNewMerchant,
    setMerchantOptions,
    refetchMerchant,
    setSearchKey,
  };
}
