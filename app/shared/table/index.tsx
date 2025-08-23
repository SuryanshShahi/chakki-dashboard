'use client';
import { useClickOutside } from '@/app/utils/hooks/useClickOutside';
import { getActionBtn } from '@/app/utils/static';
import { CloseIcon } from '@/app/utils/svgs';
import { IEmptyState, IParams, ITableHeading } from '@/app/utils/types';
import clsx from 'clsx';
import moment from 'moment';
import { Fragment, useEffect, useRef, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiCalendar } from 'react-icons/fi';
import UserCard from '../UserCard';
import BtnGroup from '../buttons/BtnGroup';
import Button from '../buttons/Button';
import CalendarPopup, { CalendarPopupProps } from '../calendarPopup';
import Checkbox from '../checkbox';
import DropdownField from '../dropdown';
import EmptyState from '../emptyState/EmptyState';
import Heading from '../heading/Heading';
import InputField, { InputFieldProps } from '../inputField';
import Popover from '../popover';
import { renderChipCell } from './sections/RenderChip';
import { renderProgressCell } from './sections/RenderProgress';
import { renderStackCell } from './sections/RenderStacks';
import { renderTagsCell } from './sections/RenderTags';
import { ISelected } from './types';

export interface ITable {
  headings: ITableHeading[];
  data: IData;
  ids: string[] | null;
  title: string;
  enableSelection?: boolean;
  emptyState?: IEmptyState;
  searchInputProps?: InputFieldProps;
  dateFieldProps?: CalendarPopupProps;
  filterProps?: {
    quickFilters: ISelected[];
    onClick: (item: ISelected) => void;
    selected: string;
    className?: string;
    placeholder?: string;
    name?: string;
  };
  onRowClick?: (id: string) => void;
  cursor?: { next?: string; previous?: string };
  setPaginationData?: (pagination: { next: string }) => void;
}
interface IData {
  [key: string]: any[];
}
const Table = ({
  headings,
  data,
  ids,
  title,
  enableSelection,
  emptyState,
  searchInputProps,
  dateFieldProps,
  filterProps,
  onRowClick,
  cursor,
  setPaginationData,
}: ITable) => {
  const formattedData = ids;
  const { isActive, setIsActive, ref } = useClickOutside('');
  const actionRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(100);
  useEffect(() => {
    setWidth(Number(actionRef.current?.offsetWidth));
  }, [ids]);
  const renderTableCellContent = (
    variant: string | undefined,
    data: any,
    idx: number,
    id: string
  ) => {
    switch (variant) {
      case 'userCard':
        return (
          <UserCard
            {...data}
            styleTitle={clsx('text-sm line-clamp-1', data?.styleTitle)}
          />
        );
      case 'chip':
        return renderChipCell(data, idx, headings);
      case 'stack':
        return renderStackCell(data, idx, headings);
      case 'tags':
        return renderTagsCell(data, idx, headings);
      case 'progress':
        return renderProgressCell(data);
      case 'actions':
        return renderActionsCell(data, id);
      default:
        return <div className='text-tertiary text-sm'>{data}</div>;
    }
  };

  const renderActionsCell = (data: any, id: string) => {
    return (
      <div
        key={id}
        ref={actionRef}
        className={clsx(
          'flex gap-x-1 items-center justify-center relative w-max mx-auto'
        )}
      >
        {Array.isArray(data)
          ? data?.map((e: any) => (
              <Fragment key={e?.id}>
                <Button
                  className='!p-2 !border-none'
                  variant='secondary'
                  icon={getActionBtn(e?.btn)}
                  onClick={(event) => {
                    event?.stopPropagation();
                    e?.menuItems?.length
                      ? setIsActive(isActive === id ? '' : id)
                      : e?.onClick();
                  }}
                />
                {isActive === id && Boolean(e?.menuItems?.length) && (
                  <Popover
                    menuItems={e?.menuItems}
                    className='animate-slideLeft top-8 !right-0 !z-2'
                  />
                )}
              </Fragment>
            ))
          : data}
      </div>
    );
  };
  const isFilters = Boolean(searchInputProps || dateFieldProps || filterProps);
  const isPaginated = Boolean(cursor?.previous || cursor?.next);
  return (
    <div className='border border-secondary rounded-xl bg-white'>
      <Heading className='px-6 py-5 bg-white rounded-t-xl !text-lg'>
        {title}
      </Heading>
      {(searchInputProps || dateFieldProps || filterProps) && (
        <div className='flex gap-x-3 items-center px-4 py-3 border-t border-t-secondary'>
          {searchInputProps && (
            <div className='max-w-[280px] w-full'>
              <InputField {...searchInputProps} name={searchInputProps?.name} />
            </div>
          )}
          {dateFieldProps && (
            <div className='relative z-[2]'>
              <CalendarPopup
                {...dateFieldProps}
                trigger={
                  <Button
                    variant='secondary'
                    btnName={
                      dateFieldProps.value
                        ? moment(dateFieldProps.value).format('DD/MM/YYYY')
                        : 'Select Date'
                    }
                    size='sm'
                    iconFirst
                    className='gap-x-2 !font-medium'
                    icon={
                      <FiCalendar size={18} className='text-btn-secondary-fg' />
                    }
                    secondaryIcon={
                      dateFieldProps?.value && (
                        <CloseIcon
                          className='order-last mt-[2px] ml-1'
                          height={18}
                          width={18}
                          // check this
                          onClick={dateFieldProps?.onChange(null)}
                        />
                      )
                    }
                  />
                }
              />
            </div>
          )}
          {filterProps &&
            (filterProps?.quickFilters?.length > 4 ? (
              <DropdownField
                name={filterProps?.name as string}
                options={filterProps?.quickFilters}
                placeholder={filterProps?.placeholder}
                values={filterProps?.selected}
                className={clsx('ml-auto z-[2]', filterProps?.className)}
                onChangeDropdown={(e) => filterProps?.onClick(e)}
              />
            ) : (
              <BtnGroup
                buttons={filterProps?.quickFilters}
                onClick={(btn) => filterProps?.onClick(btn)}
                className='text-sm ml-auto'
                selected={filterProps?.selected || ''}
              />
            ))}
        </div>
      )}
      <EmptyState
        pageData={ids}
        data={emptyState}
        size='sm'
        className='mx-12 mb-12 pt-6'
        loaderClass='my-20'
      >
        <Fragment>
          <div
            className={clsx(
              'overflow-x-scroll h-full',
              {
                'max-h-[calc(100vh-450px)]': isFilters && isPaginated,
                'max-h-[calc(100vh-385px)]': isFilters || isPaginated,
                'max-h-[calc(100vh-315px)]': !isFilters && !isPaginated,
              },
              isActive === formattedData?.[formattedData?.length - 1] &&
                'pb-[30px]'
            )}
          >
            <table className='w-full'>
              <thead className='top-0 sticky z-[1] bg-white border-y border-y-secondary'>
                <tr
                  className={clsx(
                    '[&>*]:text-xs bg-secondary [&>*]:text-start [&>*]:font-medium [&>*]:py-3 [&>*]:px-6 [&>*]:text-tertiary',
                    enableSelection && '[&>*:first-child]:pr-0'
                  )}
                >
                  {enableSelection && (
                    <Checkbox
                      checked={false}
                      name='table'
                      className='w-max bg-secondary'
                    />
                  )}
                  {headings?.map((item, idx) => (
                    <th
                      key={item?.title}
                      className={clsx(
                        headings?.[idx]?.variant === 'actions' && '!text-center'
                      )}
                    >
                      {item?.title}
                      {item?.icon}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody ref={ref}>
                {formattedData?.map((id, idx) => (
                  <tr
                    onClick={() => {
                      onRowClick?.(id);
                      setIsActive('');
                    }}
                    key={id}
                    className={clsx(
                      '[&>*]:px-6 [&>*]:py-4',
                      idx !== formattedData?.length - 1 &&
                        'border-b border-secondary',
                      enableSelection && '[&>*:first-child]:pr-0',
                      onRowClick && 'cursor-pointer'
                    )}
                  >
                    {enableSelection && (
                      <td className='w-5'>
                        <Checkbox
                          checked={false}
                          name='table'
                          className='w-max bg-secondary'
                        />
                      </td>
                    )}
                    {Object.keys(data)?.map((item, idx1) => {
                      const elem = data?.[item as keyof IParams];
                      const row = idx;
                      return (
                        <td
                          key={idx1?.toString()}
                          className={clsx('max-w-[330px]')}
                          style={{
                            width:
                              headings?.[idx1]?.variant === 'actions'
                                ? `${width}px`
                                : 'fit-content',
                          }}
                        >
                          {renderTableCellContent(
                            headings?.[idx1]?.variant,
                            elem?.[row],
                            idx1,
                            id
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Fragment>
      </EmptyState>
      {(cursor?.previous || cursor?.next) && (
        <div className='flex justify-between border-t border-secondary items-center px-6 py-3'>
          {cursor?.previous && (
            <Button
              btnName='Previous'
              variant='secondary'
              size='sm'
              iconFirst
              icon={<FiArrowLeft size={20} />}
              onClick={() =>
                setPaginationData?.({ next: cursor?.previous || '' })
              }
            />
          )}
          {cursor?.next && (
            <Button
              btnName='Next'
              variant='secondary'
              size='sm'
              icon={<FiArrowRight size={20} />}
              className='ml-auto'
              onClick={() => setPaginationData?.({ next: cursor?.next || '' })}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Table;
