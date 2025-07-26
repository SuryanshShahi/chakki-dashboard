import { requestOtp } from '@/app/apis/apis';
import { showToast } from '@/app/shared/ToastMessage';
import useSharedVariables from '@/app/utils/hooks/useSharedVariables';
import { loginWithEmailSchema } from '@/app/utils/schemas';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';

const initialValues = {
  email: '',
  otp: '',
  otpId: undefined,
};

const useHook = () => {
  const { registeredDeviceId } = useSharedVariables();
  const formikProps = useFormik({
    initialValues,
    validateOnMount: true,
    validationSchema: loginWithEmailSchema,
    onSubmit: async (values) => {
      sendOtp({
        mode: 'email',
        identifier: values.email,
        registeredDeviceId,
        type: 'admin',
      });
    },
  });

  const { mutate: sendOtp, isPending } = useMutation({
    mutationFn: requestOtp,
    onSuccess: (data) => {
      formikProps.setFieldValue('otpId', data?.id);
      showToast({
        title: 'OTP sent successfully',
        type: 'success',
      });
    },
    onError: (error: any) => {
      showToast({
        title: error?.response?.data?.message,
        type: 'error',
      });
    },
  });

  const isBtnDisabled = Boolean(Object.values(formikProps.errors).length);

  return {
    sendOtp,
    isPending,
    isBtnDisabled,
    ...formikProps,
  };
};

export default useHook;
