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
  IAddChakki,
  IAddChakkiAddress,
  IChakkiDetails,
  IUpdateChakki,
} from '../types';

export interface IInitialValue extends IAddChakki {
  images?: {
    id?: UUID;
    url?: string;
    file?: File;
  }[];
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

  const { data: chakki, isLoading: isLoadingChakkis } = useQuery<{
    data: IChakkiDetails;
  }>({
    queryKey: ['chakkiDetails', chakkiId],
    queryFn: () => getChakkiDetails(chakkiId as UUID),
    enabled: !!chakkiId,
    refetchOnMount: true,
  });
  const chakkiDetails = chakki?.data;

  const {
    data: merchantList,
    isLoading: isLoadingMerchants,
    refetch: refetchMerchants,
  } = useQuery<{
    data: IUser[];
  }>({
    queryKey: ['activeMerchantList'],
    queryFn: () => getActiveMerchantList(1, 10, undefined),
    enabled: !chakkiId,
    refetchOnMount: true,
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
    minOrderAmount: chakkiDetails?.minOrderValue,
    operationalHours: chakkiDetails?.operationalHours || {},
    deliveryRangeInKms: chakkiDetails?.deliveryRangeInKms,
    contactDetails: chakkiDetails?.contactDetails,
    externalStoreLinks: chakkiDetails?.externalStoreLinks || [],
    images: chakkiDetails?.photos || [],
    showExtraContactInfo: false,
    selectedDays: [0, 1, 2, 3, 4, 5, 6],
    address: null,
  };

  const formikProps = useFormik({
    initialValues,
    validateOnMount: true,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit(values) {
      const payload = {
        ...values,
        merchantId: values.merchant?.value as UUID,
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
    values.images
      ?.filter((i) => i?.file)
      .forEach((image) => {
        formData.append('images', image as Blob, image.file?.name);
      });

    addChakkiImagesMutation({
      chakkiId: chakkiId,
      formData: {},
    });
  };

  const { mutate: addChakkiMutation } = useMutation({
    mutationFn: (data: IAddChakki) => addChakki(data),
    onSuccess: (res) => {
      showToast({
        title: 'Chakki added successfully',
        type: 'success',
      });

      if (values.images?.filter((i) => i?.file)?.length) {
        addNewChakkiImages(res?.id);
      }

      if (values.address) {
        const payload = {
          ...values.address,
          latitude: extractLatLng(values.address.mapLink!)?.latitude || 0,
          longitude: extractLatLng(values.address.mapLink!)?.longitude || 0,
        };
        addChakkiAddressMutation({
          chakkiId: res?.id,
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

      if (values.images?.filter((i) => i?.file)?.length) {
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
      debounce(async (searchKey: string) => {
        const res = await refetchMerchants();
        const newOptions = (res?.data?.data || [])?.map((m) => ({
          label: `${m.name} (${m.phone})`,
          value: m.id,
        }));

        setMerchantOptions([
          ...newOptions,
          {
            label: `+ Add "${searchKey}"`,
            value: 'add-new',
          },
        ]);
      }, 400),
    [refetchMerchants, setMerchantOptions]
  );

  useEffect(() => {
    if (!merchantList?.data?.length) return;
    const options = merchantList.data.map((m) => ({
      label: `${m.name} (${m.phone})`,
      value: m.id,
    }));
    setMerchantOptions(options);
  }, [merchantList]);

  const isBtnDisabled = Object.values(errors).length;

  return {
    isLoadingChakkis,
    merchantList,
    isBtnDisabled,
    isLoadingMerchants,
    formikProps,
    merchantOptions,
    loadMerchantOptions,
  };
}
