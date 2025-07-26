'use client';
import Heading from '@/app/shared/Heading';
import Text from '@/app/shared/Text';
import Button from '@/app/shared/buttons/Button';
import InputField from '@/app/shared/inputField';
import { localize } from '@/i18n/dictionaries';
import clsx from 'clsx';
import useHook from './useHook';

const LoginViaEmail = () => {
  const {
    isPending,
    handleSubmit,
    values,
    errors,
    touched,
    isBtnDisabled,
    handleChange,
    handleBlur,
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
          {/* <OtpInputField
            otp={watch('otp')}
            setOtp={(otp) => setValue('otp', otp)}
            label='Secure Code'
            errorMessage=''
            resend={() => {
              resendOtp();
              setValue('otp', '');
            }}
          />
          <Button
            btnName='Next'
            variant='primary'
            fullWidth
            onClick={handleSubmit(onSubmit)}
            disabled={isBtnDisabled}
            isLoading={watch('isLoading')}
          /> */}
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
            wrapperClass='border p-2 rounded'
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
