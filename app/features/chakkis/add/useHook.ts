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
import { debounce, extractLatLng } from '@/app/utils/constants';
import { addChakkiSchema } from '@/app/utils/schemas';
import { IUser } from '@/app/utils/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { File } from 'buffer';
import { UUID } from 'crypto';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
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
    name: string;
    phone: string;
    email: string;
  } | null>(null);

  const { data: chakki, isLoading: isLoadingChakkiDetails } = useQuery<{
    data: IChakkiDetails;
  }>({
    queryKey: ['chakkiDetails', chakkiId],
    queryFn: () => getChakkiDetails(chakkiId as UUID),
    enabled: !!chakkiId,
  });
  const chakkiDetails = chakki?.data;

  const [searchKey, setSearchKey] = useState<string | undefined>(undefined);
  const {
    data: merchantList,
    isFetching: isFetchMerchants,
    refetch: refetchMerchant,
  } = useQuery<{
    data: IUser[];
  }>({
    queryKey: ['activeMerchantList', searchKey],
    queryFn: () =>
      getActiveMerchantList(
        1,
        10,
        searchKey ? btoa(JSON.stringify({ q: searchKey as string })) : undefined
      ),
    enabled: !chakkiId,
  });

  const initialValues: IInitialValue = {
    name: chakkiDetails?.name ?? '',
    code: chakkiDetails?.code ?? '',
    link: '',
    merchantId: chakkiDetails?.merchant?.id ?? undefined,
    merchant: chakkiDetails?.merchant
      ? {
          label: chakkiDetails?.merchant?.name,
          value: chakkiDetails?.merchant?.id as string,
        }
      : null,
    isCustomerRequestAvailable:
      chakkiDetails?.isCustomerRequestAvailable ?? false,
    operationalHours: chakkiDetails?.operationalHours || {},
    minOrderAmount: chakkiDetails?.minOrderValue ?? 0,
    deliveryRangeInKms: chakkiDetails?.deliveryRangeInKms ?? 0,
    contactDetails: chakkiDetails?.contactDetails,
    externalStoreLinks: chakkiDetails?.externalStoreLinks || [],
    images: [],
    showExtraContactInfo: false,
    selectedDays: [0, 1, 2, 3, 4, 5, 6],
    address: {
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      landmark: '',
      mapLink: '',
    },
    startTime: '09:00',
    endTime: '18:00',
  };

  const formikProps = useFormik({
    initialValues,
    validateOnMount: true,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit(values) {
      const operationalHours: IOperationalHours = {};
      values.selectedDays.forEach((d) => {
        operationalHours[d] = {
          startTime: values.startTime!,
          endTime: values.endTime!,
        };
      });
      const payload: IAddChakkiPayload = {
        name: values.name,
        code: values.code,
        contactDetails: values.contactDetails,
        isCustomerRequestAvailable: values.isCustomerRequestAvailable,
        minOrderAmount: values.minOrderAmount,
        operationalHours: values.operationalHours,
        isAcceptingOrders: values.isAcceptingOrders,
        isAcceptingPickups: values.isAcceptingOrders,
        deliveryRangeInKms: values.deliveryRangeInKms,
        externalStoreLinks: values.externalStoreLinks,
        merchantId: (values.merchant?.value as UUID) || values?.merchantId,
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

  const determineSearchType = (value: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^\+?[0-9\s-]{7,15}$/;
    if (emailPattern.test(value)) {
      return 'email';
    } else if (phonePattern.test(value)) {
      return 'phone';
    } else {
      return 'name';
    }
  };

  const onCreateNewMerchant = (key: string) => {
    const searchType = determineSearchType(key);
    const defaultData = {
      name: searchType === 'name' ? key : '',
      email: searchType === 'email' ? key : '',
      phone: searchType === 'phone' ? key : '',
    };
    setIsAddMerchant(defaultData);
  };

  const { mutate: addChakkiImagesMutation } = useMutation({
    mutationFn: (data: { chakkiId: UUID; formData: any }) =>
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
          addressLine1: values.address.addressLine1,
          addressLine2: values.address.addressLine2,
          addressLine3: values.address.addressLine3,
          landmark: values.address.landmark,
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

  const loadMerchantOptions = useMemo(
    () =>
      debounce((key: string) => {
        setSearchKey(key);
      }, 400),
    []
  );

  useEffect(() => {
    const newOptions =
      merchantList?.data.map((m) => ({
        label: `${m.name} (${m.phone})`,
        value: m.id,
      })) || [];

    console.log({ newOptions });

    setMerchantOptions([
      ...newOptions,
      {
        label: `+ Add ${searchKey || ''}`,
        value: 'add-new',
      },
    ]);
  }, [merchantList, searchKey]);

  const isBtnDisabled = Object.values(errors).length;

  return {
    isLoadingChakkiDetails,
    merchantList,
    isBtnDisabled,
    isFetchMerchants,
    formikProps,
    merchantOptions,
    isAddMerchant,
    loadMerchantOptions,
    setIsAddMerchant,
    onCreateNewMerchant,
    setMerchantOptions,
    refetchMerchant,
  };
}
