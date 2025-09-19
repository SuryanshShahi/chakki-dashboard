'use client';
import Text from '@/app/shared/Text';
import Button from '@/app/shared/buttons/Button';
import Heading from '@/app/shared/heading/Heading';
import InputField from '@/app/shared/inputField';
import OtpInputField from '@/app/shared/inputField/OtpInput';
import { localize } from '@/i18n/dictionaries';
import clsx from 'clsx';
import useHook from './useHook';

const LoginViaEmail = () => {
  const {
    isPending,
    registeredDeviceId,
    values,
    errors,
    touched,
    isBtnDisabled,
    sendOtp,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
    handleLogin,
  } = useHook();

  return (
    <div className='space-y-4'>
      <div>
        <Heading as='h5' className={clsx('w-max mx-auto text-2xl')}>
          Sign In
        </Heading>
        <Text
          className={clsx('w-max mx-auto mt-2')}
          type='light'
          variant='tertiary'
          size='sm'
        >
          Access to your Chakkiwala admin account
        </Text>
      </div>
      {values.otpId ? (
        <>
          <OtpInputField
            otp={values.otp}
            setOtp={(otp) => {
              setFieldValue('otp', otp);
              if (otp?.length === 6 && values.otpId) {
                handleLogin(otp);
              }
            }}
            errorMessage={errors.otp}
            resend={() => {
              sendOtp({
                mode: 'email',
                identifier: values.email,
                registeredDeviceId,
                type: 'admin',
              });
              setFieldValue('otp', '');
            }}
          />
          <Button
            btnName='Next'
            variant='primary'
            type='button'
            fullWidth
            disabled={isBtnDisabled}
            isLoading={isPending}
            onClick={() => handleSubmit()}
          />
        </>
      ) : (
        <div className='space-y-4'>
          <InputField
            label={localize('email')}
            placeholder={localize('enter_your_email')}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values?.email}
            errorMessage={errors?.email && touched?.email ? errors?.email : ''}
            type='email'
          />
          <Button
            btnName='Next'
            variant='primary'
            type='button'
            fullWidth
            disabled={isBtnDisabled}
            isLoading={isPending}
            onClick={() => handleSubmit()}
          />
        </div>
      )}
    </div>
  );
};

export default LoginViaEmail;
