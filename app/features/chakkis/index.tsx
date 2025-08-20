'use client';
import PageWrapper from '@/app/components/pageWrapper/PageWrapper';
import { IChip } from '@/app/shared/Chip';
import Divider from '@/app/shared/Divider';
import Text from '@/app/shared/Text';
import { IUserCard } from '@/app/shared/UserCard';
import Button from '@/app/shared/buttons/Button';
import HeadingWithBtn from '@/app/shared/heading/HeadingWithBtn';
import Table from '@/app/shared/table';
import { SvgLocation } from '@/app/utils/svgs';
import { ITableHeading } from '@/app/utils/types';
import { tw } from '@/tailwind.config';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useHook } from './useHook';

const headings: ITableHeading[] = [
  { title: 'Chakki', variant: 'userCard' },
  { title: 'Address', variant: 'userCard' },
  { title: 'Status', variant: 'chip' },
];

const Chakkis = () => {
  const {
    router,
    chakkiList,
    isLoading,
    filters,
    hasFilters,
    setFilters,
    initialFilters,
  } = useHook();

  const tableData: {
    chakki: IUserCard[];
    address: IUserCard[];
    status: (IChip | undefined)[];
  } = {
    chakki: chakkiList?.data?.map((e) => ({
      title: e.name,
      subtitle: '#' + e.code,
      type: 'info',
      styleTitle: 'capitalize !font-normal',
      image: e?.photos?.[0]?.url,
      showInitials: true,
      styleImage: 'min-w-10 object-cover',
    })),
    address: chakkiList?.data?.map((e) => ({
      title: e.address?.addressLine1,
      subtitle: e.code,
      type: 'info',
      styleTitle: 'capitalize !font-normal',
      children: e?.address?.longitude && e?.address?.latitude && (
        <div
          onClick={() => {
            window.open(
              `https://www.google.com/maps?q=${e.address.latitude},${e.address.longitude}`,
              '_blank'
            );
          }}
          style={{ cursor: 'pointer' }} // to show it's clickable
        >
          <SvgLocation
            height={18}
            width={18}
            stroke={tw.textColor['primary']}
            // className='!rounded-full'
          />
        </div>
      ),
    })),
    status: chakkiList?.data?.map((e) => ({
      title: e.status,
      className: 'rounded-full !px-[10px]',
      variant: getVariant(e?.status),
      type: 'tag',
      size: 'sm',
    })),
  };

  return (
    <PageWrapper breadCrumbs={[{ label: 'Chakkis' }]}>
      <div className='space-y-6'>
        <div className='space-y-1'>
          <HeadingWithBtn
            headingProps={{
              children: 'Chakkis',
              className: '!text-3xl',
            }}
          >
            <Button
              size='sm'
              icon={<IoIosAddCircleOutline />}
              btnName='Add'
              iconFirst
              onClick={() => router.push('/chakkis/add')}
            />
          </HeadingWithBtn>
          <Text variant='tertiary'>Chakkis across the system</Text>
        </div>
        <Divider variant='secondary' />
        <Table
          title={'List of Chakkis'}
          headings={headings}
          data={tableData}
          ids={
            isLoading ? null : chakkiList?.data?.map((item) => item?.id || '')
          }
          onRowClick={(id) => {
            router.push(`/chakkis/${id}`);
          }}
          emptyState={{
            title: 'No data found',
            subtitle: filters.q
              ? `Your search “${filters.q}” did not match any item. Please try again.`
              : hasFilters
              ? 'Try changing the filters or clearing them'
              : 'Your activity history will show up once you start engaging.',
            btnProps: {
              btnName: hasFilters ? 'Clear Filters' : 'Go Back',
              onClick: () =>
                hasFilters ? setFilters(initialFilters) : router.push('/home'),
              size: 'sm',
            },
          }}
        />
      </div>
    </PageWrapper>
  );
};

export default Chakkis;

const getVariant = (status: string) => {
  console.log({ status });

  if (status === 'draft') {
    return 'warning';
  } else if (status === 'active') {
    return 'success';
  } else if (status === 'inactive') {
    return 'gray';
  }
  return 'error';
};
