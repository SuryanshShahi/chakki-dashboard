import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { format } from 'url';
import EmptyState from '../emptyState/EmptyState';

interface ITabBar {
  tabs: {
    name: string;
    count?: number;
    reactIcon?: ReactNode;
    component?: ReactNode;
    body?: ReactNode;
  }[];
  className?: string;
  variant?: 'button' | 'link';
  fullWidth?: boolean;
  handleClick?: () => void;
}
const TabBar: FC<PropsWithChildren<ITabBar>> = ({
  children,
  tabs,
  className,
  variant = 'button',
  fullWidth = false,
  handleClick,
}) => {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = params.size
    ? Object.fromEntries(params.entries())?.tab
    : tabs[0]?.name?.toLowerCase();
  const renderComponent = tabs?.find(
    (e) => e?.name?.toLowerCase() === activeTab
  )?.component;
  return (
    <div className={clsx(`space-y-6`, className)}>
      <div className='relative'>
        <div
          className={clsx('flex overflow-x-scroll', {
            'gap-x-1 rounded-[10px] bg-gray-50 p-1': variant === 'button',
            'gap-x-4': variant === 'link',
          })}
        >
          {tabs?.map((item, idx) => (
            <div
              className={clsx(
                'flex gap-x-2 text-nowrap text-quaternary font-semibold items-center justify-center cursor-pointer text-center text-sm',
                { 'w-full': fullWidth },
                {
                  'py-2 px-4': variant === 'button',
                  'px-1 border-b-2 border-b-transparent': variant === 'link',
                },
                variant === 'link' &&
                  (Boolean(item?.count?.toString()) ? 'pb-4' : 'pb-3'),
                {
                  'bg-white rounded-[6px] shadow-sm text-secondary':
                    variant === 'button' &&
                    activeTab === item?.name.toLowerCase(),
                  'z-10 !text-brand-secondary border-b-2 !border-b-brand-tertiary':
                    variant === 'link' &&
                    activeTab === item?.name.toLowerCase(),
                }
              )}
              role='button'
              tabIndex={0}
              onKeyDown={() => {}}
              key={item?.name}
              onClick={() => {
                router.push(
                  format({
                    pathname: pathname,
                    query: { tab: item?.name?.toLowerCase() },
                  })
                );
                handleClick?.();
              }}
            >
              {item?.reactIcon && item.reactIcon} {item?.name}
              {Boolean(item?.count) && (
                <div
                  className={clsx(
                    'bg-white border flex text-gray-700 flex-col justify-center items-center border-gray-200 text-xs rounded-full',
                    item?.count && item.count.toString().length > 1
                      ? 'px-2 h-6'
                      : 'h-6 w-6'
                  )}
                >
                  {item?.count}
                </div>
              )}
            </div>
          ))}
        </div>
        {variant === 'link' && (
          <div className='h-[1px] -mt-[2px] w-full border-b border-secondary absolute' />
        )}
      </div>
      {children}
      {renderComponent ? renderComponent : <EmptyState />}
    </div>
  );
};

export default TabBar;
