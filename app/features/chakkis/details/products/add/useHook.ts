import {
  addProduct,
  addProductImages,
  getProductDetails,
  updateProduct,
} from '@/app/apis/apis';
import { showToast } from '@/app/shared/ToastMessage';
import { IDropdown } from '@/app/shared/dropdown';
import { MEASUREMENT_UNITS, ObjectUtils } from '@/app/utils/constants';
import { addProductSchema } from '@/app/utils/schemas';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UUID } from 'crypto';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { IChakkiDetails } from '../../../types';
import { IAddProductPayload, IProductDetails, IUpdateProduct } from '../types';

export interface IInitialValue
  extends Omit<
    IAddProductPayload,
    'isAvailable' | 'status' | 'measurementUnit'
  > {
  images?: File[];
  link?: string;
  measurementUnit?: IDropdown;
}

export function useHook(chakkiId: UUID, productId?: UUID) {
  const router = useRouter();

  const queryClient = useQueryClient();

  const chakkiDetails = queryClient.getQueryData<IChakkiDetails>([
    'chakkiDetails',
    chakkiId,
  ]);

  const { data: productDetails, isLoading: isLoadingProductDetails } =
    useQuery<IProductDetails>({
      queryKey: ['productDetails', chakkiId],
      queryFn: () => getProductDetails(chakkiId, productId as UUID),
      enabled: Boolean(chakkiId && productId),
    });

  const initialValues: IInitialValue = {
    measurementUnit: MEASUREMENT_UNITS.find(
      (u) => u.value === productDetails?.measurementUnit
    ),
    images: [],
    ...(productDetails
      ? ObjectUtils.pick(productDetails, [
          'name',
          'code',
          'description',
          'pricePerUnit',
          'takeCustomerRequests',
        ])
      : {
          name: '',
          code: '',
          description: '',
          pricePerUnit: 0,
          takeCustomerRequests: false,
        }),
  };

  const formikProps = useFormik({
    initialValues,
    validateOnMount: true,
    enableReinitialize: true,
    validateOnChange: true,
    onSubmit(values) {
      const payload: IAddProductPayload = {
        measurementUnit: values?.measurementUnit?.value || '',
        status: 'draft',
        isAvailable: true,
        ...ObjectUtils.pick(values, [
          'name',
          'code',
          'description',
          'pricePerUnit',
          'takeCustomerRequests',
        ]),
      };
      if (productId) {
        updateProductMutation({
          chakkiId,
          productId,
          payload,
        });
      } else {
        addProductMutation(payload);
      }
    },
    validationSchema: addProductSchema,
  });

  const { errors, values } = formikProps;

  const { mutate: addProductImagesMutation } = useMutation({
    mutationFn: (data: {
      chakkiId: UUID;
      productId: UUID;
      formData: FormData;
    }) => addProductImages(data.chakkiId, data.productId, data.formData),
    onError: (err: any) => {
      showToast({
        title: err?.response?.data?.message,
        type: 'error',
      });
    },
  });

  const addNewProductImages = (chakkiId: UUID, productId: UUID) => {
    const formData = new FormData();
    values.images?.forEach((image) => {
      formData.append('images', image as Blob, image?.name);
    });

    addProductImagesMutation({
      chakkiId,
      productId,
      formData,
    });
  };

  const { mutate: addProductMutation } = useMutation({
    mutationFn: (data: IAddProductPayload) => addProduct(chakkiId, data),
    onSuccess: (res) => {
      showToast({
        title: 'Product added successfully',
        type: 'success',
      });

      if (values.images?.length) {
        addNewProductImages(chakkiId, res?.data?.id);
      }

      router.replace(`..?tab=products`);
    },
    onError: (err: any) => {
      showToast({
        title: err?.response?.data?.message,
        type: 'error',
      });
    },
  });

  const { mutate: updateProductMutation } = useMutation({
    mutationFn: (data: {
      chakkiId: UUID;
      productId: UUID;
      payload: IUpdateProduct;
    }) => updateProduct(data.chakkiId, data.productId, data.payload),
    onSuccess: (res) => {
      showToast({
        title: 'Product updated successfully',
        type: 'success',
      });

      if (values.images?.length) {
        addNewProductImages(chakkiId, res?.id);
      }

      router.replace(`/chakkis/${chakkiId}/products/${productId}`);
    },
    onError: (err: any) => {
      showToast({
        title: err?.response?.data?.message,
        type: 'error',
      });
    },
  });

  const isBtnDisabled = Boolean(Object.values(errors).length);

  return {
    isLoadingProductDetails,
    isBtnDisabled,
    formikProps,
    chakkiDetails,
  };
}
