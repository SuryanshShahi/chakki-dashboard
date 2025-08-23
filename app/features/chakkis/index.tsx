'use client';
import PageWrapper from '@/app/components/pageWrapper/PageWrapper';
import { IChip } from '@/app/shared/Chip';
import Divider from '@/app/shared/Divider';
import Text from '@/app/shared/Text';
import { IUserCard } from '@/app/shared/UserCard';
import Button from '@/app/shared/buttons/Button';
import HeadingWithBtn from '@/app/shared/heading/HeadingWithBtn';
import Table from '@/app/shared/table';
import { IAction, IMenuItem, ISelected } from '@/app/shared/table/types';
import { SvgTrash } from '@/app/svgs';
import { capitalize } from '@/app/utils/constants';
import { SvgEdit, SvgLocation } from '@/app/utils/svgs';
import { ITableHeading } from '@/app/utils/types';
import { tw } from '@/tailwind.config';
import { GiNightSleep } from 'react-icons/gi';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { TiTick } from 'react-icons/ti';
import { useHook } from './useHook';

const headings: ITableHeading[] = [
  { title: 'Chakki', variant: 'userCard' },
  { title: 'Address', variant: 'userCard' },
  { title: 'Owner', variant: 'userCard' },
  { title: 'Status', variant: 'chip' },
  {
    title: 'Action',
    variant: 'actions',
    actions: ['edit', 'activate', 'archive', 'delete'],
  },
];

const Chakkis = () => {
  const {
    router,
    chakkiList,
    isLoading,
    filters,
    hasFilters,
    initialFilters,
    statusFilters,
    setFilters,
    deleteChakkiMutation,
    updateChakkiStatusMutation,
  } = useHook();

  const tableData: {
    chakki: IUserCard[];
    address: IUserCard[];
    status: (IChip | undefined)[];
    merchant: IUserCard[];
    actions: IAction[][];
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
      title: e.address
        ? `${e.address?.addressLine1} ${e.address?.addressLine2 || ''}`
        : '--',
      subtitle: e.address?.landmark ? `Near ${e.address?.landmark}` : '',
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
    merchant: chakkiList?.data?.map((e) => ({
      title: e.merchant.name,
      subtitle: e.merchant.phone,
      type: 'info',
      styleTitle: 'capitalize !font-normal',
      showInitials: true,
    })),
    status: chakkiList?.data?.map((e) => ({
      title: capitalize(e.status),
      className: 'rounded-full !px-[10px]',
      variant: getVariant(e?.status),
      type: 'tag',
      size: 'sm',
    })),
    actions: chakkiList?.data?.map((item) => [
      {
        btn: 'menu',
        menuItems: [
          item?.status !== 'inactive' && {
            icon: (
              <SvgEdit
                height={15}
                width={15}
                stroke={tw.textColor['brand-primary']}
                className='cursor-pointer'
              />
            ),
            text: 'Edit',
            onClick: () => {
              router.push(`/chakki/${item?.id}/edit`);
            },
          },
          ['draft', 'inactive'].includes(item?.status) && {
            icon: (
              <TiTick
                height={50}
                width={50}
                color={tw.textColor['success-primary']}
                className='cursor-pointer'
              />
            ),
            text: 'Activate',
            onClick: () => {
              updateChakkiStatusMutation({
                chakkiId: item.id,
                status: 'active',
              });
            },
          },
          ['draft', 'inactive'].includes(item?.status) && {
            icon: (
              <GiNightSleep
                height={20}
                width={20}
                color={tw.textColor['warning-primary']}
                className='cursor-pointer'
              />
            ),
            text: 'Inactivate',
            onClick: () => {
              updateChakkiStatusMutation({
                chakkiId: item.id,
                status: 'inactive',
              });
            },
          },
          {
            icon: (
              <SvgTrash
                height={16}
                width={16}
                stroke={tw.textColor['error-primary']}
              />
            ),
            text: 'Delete',
            onClick: () => deleteChakkiMutation(item?.id),
          },
        ].filter(Boolean) as IMenuItem[],
      },
    ]),
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
          filterProps={{
            quickFilters: statusFilters,
            name: 'status',
            onClick: (value: ISelected) =>
              setFilters((p) => ({ ...p, status: value })),
            selected: filters?.status?.value,
            className: 'max-w-[200px] !min-w-[100px]',
          }}
          searchInputProps={{
            name: 'q',
            type: 'search',
            placeholder: 'Search by Chakki name or code',
            className: 'w-full text-black',
            onChange: (e) => {
              setFilters((p) => ({ ...p, q: e }));
            },
          }}
        />
      </div>
    </PageWrapper>
  );
};

export default Chakkis;

const getVariant = (status: string) => {
  if (status === 'draft') {
    return 'warning';
  } else if (status === 'active') {
    return 'success';
  } else if (status === 'inactive') {
    return 'gray';
  }
  return 'error';
};
