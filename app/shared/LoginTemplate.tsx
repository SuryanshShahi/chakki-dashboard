import Heading from '@/app/shared/Heading';
import Text from '@/app/shared/Text';
import { FC, Fragment, PropsWithChildren, ReactNode } from 'react';
import IconWithBg from './IconWithBg';

interface ILoginTemplate {
  title: string;
  subtitle: string;
  icon?: ReactNode;
}
const LoginTemplate: FC<PropsWithChildren<ILoginTemplate>> = ({
  children,
  title,
  subtitle,
  icon,
}) => {
  return (
    <Fragment>
      <div className='space-y-4'>
        {icon && <IconWithBg icon={icon} size='md' />}
        <div className='space-y-2'>
          <Heading variant='primary' className='text-3xl' type='semibold'>
            {title}
          </Heading>
          <Text className='text-tertiary'>{subtitle}</Text>
        </div>
      </div>
      {children}
    </Fragment>
  );
};

export default LoginTemplate;
