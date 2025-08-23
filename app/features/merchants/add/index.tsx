import { addMerchant } from '@/app/apis/apis';
import { showToast } from '@/app/shared/ToastMessage';
import Button from '@/app/shared/buttons/Button';
import InputField from '@/app/shared/inputField';
import { ModalTemplate } from '@/app/shared/modal/ModalTemplate';
import { PhoneWithCountry } from '@/app/shared/phoneWithCountry';
import { addMerchantSchema } from '@/app/utils/schemas';
import { SvgAddUser } from '@/app/utils/svgs';
import { localize } from '@/i18n/dictionaries';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { IAddMerchantPayload } from '../types';

export const AddMerchantModal = ({
  close,
  isOpen,
  size = 'md',
  onAddMerchant,
}: {
  isOpen: boolean;
  close: () => void;
  size?: 'sm' | 'md' | 'lg';
  onAddMerchant?: (id: IAddMerchantPayload) => void;
}) => {
  const formikProps = useFormik({
    initialValues: {
      name: '',
      phone: '',
      countryCode: '+91',
      email: '',
    },
    validateOnMount: true,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: addMerchantSchema,
    onSubmit(values) {
      const payload: IAddMerchantPayload = {
        name: values.name,
        email: values.email || undefined,
        phone: `${values.countryCode}${values.phone}`,
      };
      addMerchantMutation(payload);
    },
  });

  const {
    resetForm,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    setSubmitting,
  } = formikProps;

  const { mutate: addMerchantMutation } = useMutation({
    mutationFn: (data: IAddMerchantPayload) => addMerchant(data),
    onSuccess: (res) => {
      showToast({
        title: 'Merchant added successfully',
        type: 'success',
      });
      onAddMerchant?.({
        id: res?.data?.id,
        name: values.name,
        email: values.email || undefined,
        phone: `${values.countryCode}${values.phone}`,
      });
    },
    onError: (err: any) => {
      showToast({
        title: err?.response?.data?.message,
        type: 'error',
      });
    },
    onSettled: () => {
      setSubmitting(false);
    },
  });

  return (
    <ModalTemplate
      modalProps={{
        isOpen,
        close,
      }}
      headerDetails={{
        title: 'Merchant',
        subtitle: 'Add Merchant Details',
        icon: <SvgAddUser stroke='white' />,
      }}
    >
      <div className='py-4 px-6 space-y-4'>
        <PhoneWithCountry
          name='phone'
          required
          dialName='countryCode'
          placeholder={'Enter phone'}
          value={`${values.countryCode}${values.phone}`}
          dataTestId='phone'
          label='Phone'
          {...formikProps}
        />
        <InputField
          required
          label={localize('name')}
          placeholder={localize('enter_merchant_name')}
          onChange={handleChange('name')}
          onBlur={handleBlur('name')}
          value={values.name}
          errorMessage={errors.name && touched?.name ? errors.name : ''}
          type='text'
        />
        <InputField
          label={localize('email')}
          placeholder={localize('enter_merchant_name')}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          errorMessage={errors.email && touched?.email ? errors.email : ''}
          type='text'
        />
      </div>
      <div className='py-4 px-6 w-full flex items-center space-x-3'>
        <Button
          btnName='Cancel'
          variant='secondary'
          fullWidth
          onClick={() => {
            resetForm();
            close();
          }}
        />
        <Button
          btnName='Add Merchant'
          variant='primary'
          fullWidth
          onClick={() => handleSubmit()}
          disabled={isSubmitting}
        />
      </div>
    </ModalTemplate>
  );
};
