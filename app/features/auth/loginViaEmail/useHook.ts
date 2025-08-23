import { requestOtp, verifyOtp } from '@/app/apis/apis';
import { showToast } from '@/app/shared/ToastMessage';
import { setCookie } from '@/app/utils/cookies';
import useSharedVariables from '@/app/utils/hooks/useSharedVariables';
import { loginWithEmailSchema } from '@/app/utils/schemas';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { IVerifyOtp } from '../types';

const initialValues = {
  email: '',
  otp: '',
  otpId: undefined,
};

const useHook = () => {
  const { registeredDeviceId, queryParams } = useSharedVariables();
  const router = useRouter();
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
  const { values, errors, setFieldValue, setFieldError } = formikProps;

  const { mutate: sendOtp, isPending } = useMutation({
    mutationFn: requestOtp,
    onSuccess: (data) => {
      setFieldValue('otpId', data?.id);
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

  const { mutate: loginRequest } = useMutation({
    mutationFn: (data: IVerifyOtp) => verifyOtp(data),
    onSuccess: (res) => {
      setCookie(
        'token',
        JSON.stringify({
          accessToken: res?.accessToken,
          refreshToken: res?.refreshToken,
        })
      );
      router.push('/home');
    },
    onError: (err: any) => {
      setFieldError('otp', err?.response?.data?.response?.message as string);
    },
    onSettled: () => {
      formikProps.setSubmitting(false);
    },
  });
  const handleLogin = () => {
    if (values?.otp?.length === 6 && values?.otpId) {
      const payload = {
        otpId: values?.otpId,
        otp: values?.otp,
        mode: 'email',
      };
      loginRequest(payload);
    } else {
      setFieldError('otp', '');
    }
  };

  useEffect(() => {
    handleLogin();
  }, [values?.otp, values?.otpId]);

  const isBtnDisabled = Boolean(Object.values(errors).length);

  return {
    sendOtp,
    isPending,
    isBtnDisabled,
    registeredDeviceId,
    ...formikProps,
  };
};

export default useHook;
