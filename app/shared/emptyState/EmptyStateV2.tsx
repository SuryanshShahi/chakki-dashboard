import { colors } from '@/app/utils/colors';
import { SvgNoResults } from '@/app/utils/svgs';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';
import Loader from '../Loader';
import Text from '../Text';
import Button, { IButton } from '../buttons/Button';
import Heading from '../heading/Heading';

interface IEmptyStateV2 {
  className?: string;
  data?: any[] | null | string;
  title?: string;
  description?: string;
  height?: number;
  variant?: 'NO_RESULTS' | 'NOTIFICATION';
  size?: 'sm' | 'md';
  btnProps?: IButton;
  hideBtn?: boolean;
}

const EmptyStateV2: FC<PropsWithChildren<IEmptyStateV2>> = ({
  title,
  description,
  className,
  data,
  children,
  variant = 'NO_RESULTS',
  size,
  btnProps,
  hideBtn,
  height,
}) => {
  const router = useRouter();
  const getData = () => {
    switch (variant) {
      case 'NO_RESULTS':
        return {
          title: 'No results found',
          description: 'No results found. Please try again.',
          icon: (
            <SvgNoResults
              height={size === 'sm' ? 150 : size === 'md' ? 200 : 300}
              width={size === 'sm' ? 150 : size === 'md' ? 200 : 300}
              color1={colors.brand[600] + '10'}
              color2={colors.brand[600] + '40'}
              color3={colors.brand[600] + '20'}
              color4={colors.brand[600] + '00'}
            />
          ),
        };

      default:
        break;
    }
  };

  return !data ? (
    <Loader variant='full-screen' height={height} />
  ) : data?.length === 0 ? (
    <div
      className={clsx(
        'flex flex-col justify-center items-center gap-y-8 md:max-w-[380px] max-w-[300px] m-auto',
        { 'gap-y-3': size === 'sm' },
        { 'gap-y-3': size === 'md' },
        className
      )}
      style={{ height: height ? `calc(100vh - ${height}px)` : '100%' }}
    >
      {getData()?.icon}
      <div className={clsx(`gap-y-2 flex flex-col items-center`)}>
        <Heading>{title || getData()?.title}</Heading>
        <Text className='text-center'>
          {description || getData()?.description}
        </Text>
      </div>
      {!hideBtn && (
        <Button
          {...btnProps}
          btnName={btnProps?.btnName || 'Go Back'}
          iconFirst
          size='sm'
          className={clsx('max-w-[370px] mx-auto !-mt-3', btnProps?.className)}
          onClick={btnProps?.onClick ? btnProps?.onClick : () => router.back()}
        />
      )}
    </div>
  ) : (
    children
  );
};

export default EmptyStateV2;
