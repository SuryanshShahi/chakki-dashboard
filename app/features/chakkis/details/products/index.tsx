'use client';
import { IChip } from '@/app/shared/Chip';
import { IUserCard } from '@/app/shared/UserCard';
import Table from '@/app/shared/table';
import { IAction, IMenuItem, ISelected } from '@/app/shared/table/types';
import { SvgTrash } from '@/app/svgs';
import { capitalize } from '@/app/utils/constants';
import { SvgEdit } from '@/app/utils/svgs';
import { ITableHeading } from '@/app/utils/types';
import { tw } from '@/tailwind.config';
import { GiNightSleep } from 'react-icons/gi';
import { TiTick } from 'react-icons/ti';
import { useHook } from './useHook';

const headings: ITableHeading[] = [
  { title: 'Name', variant: 'userCard' },
  { title: 'Price', variant: 'chip' },
  { title: 'Status', variant: 'chip' },
  {
    title: 'Action',
    variant: 'actions',
    actions: ['edit', 'activate', 'archive', 'delete'],
  },
];

const Products = () => {
  const {
    router,
    productList,
    isLoading,
    filters,
    hasFilters,
    initialFilters,
    statusFilters,
    chakkiId,
    setFilters,
    deleteProductMutation,
    updateProductStatusMutation,
  } = useHook();

  const tableData: {
    name: IUserCard[];
    price: (IChip | undefined)[];
    status: (IChip | undefined)[];
    actions: IAction[][];
  } = {
    name: productList?.map((e) => ({
      title: e.name,
      subtitle: '#' + e.code,
      type: 'info',
      styleTitle: 'capitalize !font-normal',
      showInitials: true,
      styleImage: 'min-w-10 object-cover',
    })),
    price: productList?.map((e) => ({
      title: '₹' + e.pricePerUnit + '/' + e.measurementUnit,
      className: 'rounded-full !px-[10px]',
      variant: 'brand',
      type: 'primary',
      size: 'sm',
    })),
    status: productList?.map((e) => ({
      title: capitalize(e.status),
      className: 'rounded-full !px-[10px]',
      variant: getVariant(e?.status),
      type: 'tag',
      size: 'sm',
    })),
    actions: productList?.map((item) => [
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
              updateProductStatusMutation({
                productId: item.id,
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
              updateProductStatusMutation({
                productId: item.id,
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
            onClick: () => deleteProductMutation(item?.id),
          },
        ].filter(Boolean) as IMenuItem[],
      },
    ]),
  };

  return (
    <Table
      title={'List of Products'}
      headings={headings}
      data={tableData}
      ids={isLoading ? null : productList?.map((item) => item?.id || '')}
      onRowClick={(id) => {
        router.push(`/chakkis/${chakkiId}/products/${id}`);
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
        placeholder: 'Search by Product name or code',
        className: 'w-full text-black',
        onChange: (e) => {
          setFilters((p) => ({ ...p, q: e }));
        },
      }}
    />
  );
};

export default Products;

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
