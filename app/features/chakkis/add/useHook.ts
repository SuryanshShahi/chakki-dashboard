import {
  addChakki,
  addChakkiImages,
  getActiveMerchantList,
  getChakkiDetails,
  updateChakki,
} from '@/app/apis/apis';
import { showToast } from '@/app/shared/ToastMessage';
import { IDropdown } from '@/app/shared/dropdown';
import { addChakkiSchema } from '@/app/utils/schemas';
import { IUser } from '@/app/utils/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { File } from 'buffer';
import { UUID } from 'crypto';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { IAddChakki, IChakkiDetails, IUpdateChakki } from '../types';

interface IInitialValue extends IAddChakki {
  images?: {
    id?: UUID;
    url?: string;
    file?: File;
  }[];
  merchant: IDropdown;
  link?: string;
  showExtraContactInfo?: boolean;
}

export function useHook(chakkiId?: UUID) {
  const router = useRouter();

  const { data: chakki, isLoading: isLoadingChakkis } = useQuery<{
    data: IChakkiDetails;
  }>({
    queryKey: ['chakkiDetails', chakkiId],
    queryFn: () => getChakkiDetails(chakkiId as UUID),
    enabled: !!chakkiId,
    refetchOnMount: true,
  });
  const chakkiDetails = chakki?.data;

  const { data: merchantList, isLoading: isLoadingMerchants } = useQuery<{
    data: IUser[];
  }>({
    queryKey: ['activeMerchantList'],
    queryFn: () => getActiveMerchantList(),
    enabled: !chakkiId,
    refetchOnMount: true,
  });

  console.log(merchantList);

  const merchant = merchantList?.data?.find(
    (m) => m?.id === chakkiDetails?.merchant?.id
  );

  const initialValues: IInitialValue = {
    name: chakkiDetails?.name ?? '',
    code: chakkiDetails?.code ?? '',
    link: '',
    merchantId: chakkiDetails?.merchant?.id ?? undefined,
    merchant: {
      label: merchant?.name,
      value: merchant?.id as string,
    },
    isCustomerRequestAvailable:
      chakkiDetails?.isCustomerRequestAvailable ?? false,
    minOrderAmount: chakkiDetails?.minOrderValue,
    operationalHours: chakkiDetails?.operationalHours || {},
    deliveryRangeInKms: chakkiDetails?.deliveryRangeInKms,
    contactDetails: chakkiDetails?.contactDetails,
    externalStoreLinks: chakkiDetails?.externalStoreLinks || [],
    addressId: chakkiDetails?.addressId,
    images: chakkiDetails?.photos || [],
    showExtraContactInfo: false,
  };

  const formikProps = useFormik({
    initialValues,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit(values) {
      const payload = {
        ...values,
        merchantId: values.merchant.value as UUID,
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

  const isBtnDisabled = Object.values(errors).length;

  return {
    isLoadingChakkis,
    merchantList,
    isBtnDisabled,
    isLoadingMerchants,
    formikProps,
  };
}
