'use client';
import Divider from '@/app/shared/Divider';
import Button, { IButton } from '@/app/shared/buttons/Button';
import { useClickOutside } from '@/app/utils/hooks/useClickOutside';
import clsx from 'clsx';
import { FC, Fragment, PropsWithChildren, ReactNode } from 'react';
import { TbDotsVertical } from 'react-icons/tb';
import Text from '../Text';
import UserCard from '../UserCard';
import CardWrapper from '../cards/CardWrapper';
export type DetailPageType =
  | 'notice'
  | 'buzz'
  | 'poll'
  | 'survey'
  | 'deals'
  | 'offers';

interface IDetailPage {
  data: {
    title: ReactNode;
    subtitle?: ReactNode;
    brandLogo?: string;
    createdAt?: string;
    createdBy?: string;
    type?: DetailPageType | string;
  };
  className?: string;
  rightContent?: ReactNode;
  bottomContent?: ReactNode;
  buttons?: IButton[];
}
const DetailPage: FC<PropsWithChildren<IDetailPage>> = ({
  data,
  children,
  className,
  rightContent,
  bottomContent,
  buttons,
}) => {
  const chipVariants = ['notice', 'buzz', 'poll', 'survey', 'deals', 'offers'];
  const { isActive, setIsActive, ref } = useClickOutside(false);
  return (
    <div className='space-y-4 h-full'>
      <div className='flex items-start justify-between gap-x-4'>
        <UserCard
          title={data?.title}
          subtitle={data?.subtitle}
          image={data?.brandLogo}
          styleTitle='sm:!text-3xl !text-xl capitalize'
          styleSubtitle='!text-base !text-tertiary'
          styleImage='h-20 min-w-20 !rounded-[10px]'
          className='gap-x-4 !items-start'
        />
        <div className='md:flex hidden gap-x-3'>
          {buttons?.map((item, idx) => (
            <div key={item?.btnName ?? '' + idx}>
              <Button
                key={item?.btnName}
                {...item}
                size='sm'
                iconFirst={item?.iconFirst || false}
              />
              {item?.children}
            </div>
          ))}
        </div>

        {Boolean(buttons?.length) && (
          <div
            ref={ref}
            onClick={() => setIsActive(!isActive)}
            className='relative md:hidden flex flex-col items-end'
            role='button'
            tabIndex={0}
            onKeyDown={() => {}}
          >
            <TbDotsVertical className='text-quaternary' size={24} />
            {isActive && (
              <CardWrapper className='!p-0 absolute z-10 top-6 shadow-md'>
                {buttons?.map((item, idx) => (
                  <Fragment key={item?.btnName ?? '' + idx}>
                    <div
                      className='text-nowrap text-sm py-2 px-4'
                      onClick={item?.onClick}
                      role='button'
                      tabIndex={0}
                      onKeyDown={() => {}}
                    >
                      {item?.btnName}
                    </div>
                    {idx !== buttons.length - 1 && (
                      <Divider variant='tertiary' className='w-[50%] mx-auto' />
                    )}
                  </Fragment>
                ))}
              </CardWrapper>
            )}
          </div>
        )}

        {rightContent}
      </div>
      {data?.type && (
        <div className='flex gap-x-4 items-center'>
          {/* {data?.type !== 'offers' && (
            <Chip
              variant={DetailPageTags()[data?.type]?.variant || 'blue'}
              title={
                DetailPageTags(siteDetails?.name)[data?.type]?.title ||
                data?.type
              }
              size={chipVariants?.includes(data?.type) ? 'xs' : 'sm'}
              className={clsx(
                'px-2 capitalize',
                !chipVariants?.includes(data?.type) && 'rounded-full !px-[10px]'
              )}
              image={
                chipVariants?.includes(data?.type) && (
                  <div
                    className={clsx(
                      'h-4 w-4 rounded-full flex items-center justify-center',
                      {
                        'bg-utility-blue-500':
                          data?.type === 'notice' || data?.type === 'deals',
                      },
                      {
                        'bg-utility-purple-500':
                          data?.type === 'buzz' || data?.type === 'offers',
                      },
                      { 'bg-utility-warning-500': data?.type === 'poll' },
                      { 'bg-utility-success-500': data?.type === 'survey' }
                    )}
                  >
                    {DetailPageTags()[data?.type]?.icon}
                  </div>
                )
              }
            />
          )} */}

          <Text variant='tertiary' size='sm'>
            {data?.createdBy && data?.createdAt
              ? data?.createdBy + ' • ' + data?.createdAt
              : data?.createdBy || data?.createdAt}
          </Text>
        </div>
      )}
      {bottomContent}
      <Divider variant='secondary' />
      <div className={clsx('pb-5', className)}>{children}</div>
    </div>
  );
};

export default DetailPage;
