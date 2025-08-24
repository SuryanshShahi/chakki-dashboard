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
import { SvgEdit } from '@/app/utils/svgs';
import { ITableHeading } from '@/app/utils/types';
import { tw } from '@/tailwind.config';
import { GiNightSleep } from 'react-icons/gi';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { TiTick } from 'react-icons/ti';
import { AddMerchantModal } from './add';
import { useHook } from './useHook';

const headings: ITableHeading[] = [
  { title: 'Merchant', variant: 'userCard' },
  { title: 'Chakkis', variant: 'chip', maxLimit: 2 },
  { title: 'Status', variant: 'chip' },
  {
    title: 'Action',
    variant: 'actions',
    actions: ['edit', 'activate', 'archive', 'delete'],
  },
];

const Merchants = () => {
  const {
    router,
    merchantList,
    isFetchingMerchants,
    filters,
    hasFilters,
    initialFilters,
    statusFilters,
    isAddMerchant,
    setIsAddMerchant,
    setFilters,
    removeAsMerchantMutation,
    updateMerchantStatusMutation,
    refetchMerchants,
  } = useHook();

  const tableData: {
    merchant: IUserCard[];
    chakkis: IChip[][];
    status: (IChip | undefined)[];
    actions: IAction[][];
  } = {
    merchant: merchantList?.data?.map((e) => ({
      title: e.name,
      subtitle: e.phone,
      type: 'info',
      styleTitle: 'capitalize !font-normal',
      showInitials: true,
    })),
    chakkis: merchantList?.data?.map(
      (item) =>
        item?.chakkis?.map((e) => ({
          title: e?.name,
          variant: 'gray',
          className: '!pr-2',
        })) ?? []
    ),
    status: merchantList?.data?.map((e) => ({
      title: capitalize(e.status),
      className: 'rounded-full !px-[10px]',
      variant: getVariant(e?.status),
      type: 'tag',
      size: 'sm',
    })),
    actions: merchantList?.data?.map((item) => [
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
              updateMerchantStatusMutation({
                merchantId: item.id,
                status: 'active',
              });
            },
          },
          ['active'].includes(item?.status) && {
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
              updateMerchantStatusMutation({
                merchantId: item.id,
                status: 'inactive',
              });
            },
          },
          ['draft'].includes(item?.status) && {
            icon: (
              <SvgTrash
                height={16}
                width={16}
                stroke={tw.textColor['error-primary']}
              />
            ),
            text: 'Delete',
            onClick: () => removeAsMerchantMutation(item?.id),
          },
        ].filter(Boolean) as IMenuItem[],
      },
    ]),
  };

  return (
    <PageWrapper breadCrumbs={[{ label: 'Merchants' }]}>
      <div className='space-y-6'>
        <AddMerchantModal
          isOpen={isAddMerchant !== null}
          close={() => setIsAddMerchant(null)}
          size='md'
          onAddMerchant={() => {
            setIsAddMerchant(null);
            refetchMerchants();
          }}
        />

        <div className='space-y-1'>
          <HeadingWithBtn
            headingProps={{
              children: 'Merchants',
              className: '!text-3xl',
            }}
          >
            <Button
              size='sm'
              icon={<IoIosAddCircleOutline />}
              btnName='Add'
              iconFirst
              onClick={() => {
                setIsAddMerchant({
                  email: '',
                  name: '',
                  phone: '',
                });
              }}
            />
          </HeadingWithBtn>
          <Text variant='tertiary'>Merchants who own Chakkis</Text>
        </div>
        <Divider variant='secondary' />
        <Table
          title={'List of Merchants'}
          headings={headings}
          data={tableData}
          ids={
            isFetchingMerchants
              ? null
              : merchantList?.data?.map((item) => item?.id || '')
          }
          onRowClick={(id) => {
            //
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
            placeholder: 'Search by Merchant name, email or code',
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

export default Merchants;

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
