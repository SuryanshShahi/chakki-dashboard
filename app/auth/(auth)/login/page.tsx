import PageWrapper from '@/app/components/pageWrapper/PageWrapper';
import LoginViaEmail from '@/app/features/auth/loginViaEmail';
import React from 'react';

const Login = () => {
  return (
    <PageWrapper hideFooter hideHeader className='w-full'>
      <LoginViaEmail />
    </PageWrapper>
  );
};

export default Login;
