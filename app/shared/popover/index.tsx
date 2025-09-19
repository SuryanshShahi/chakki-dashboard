import clsx from 'clsx';
import { IMenuItem } from '../table/types';

const Popover = ({
  menuItems,
  className,
  close,
}: {
  menuItems: IMenuItem[];
  className?: string;
  close?: () => void;
}) => {
  return (
    <div
      className={clsx(
        'p-1 min-w-[150px] text-nowrap rounded-lg gap-x-1 prevent-select shadow-sm text-sm bg-white z-10 absolute right-0',
        className
      )}
    >
      {menuItems?.map((item, idx) => (
        <div
          className='flex items-center gap-x-2 p-2 rounded-lg hover:bg-btn-secondary-hover cursor-pointer'
          key={item?.id || "" + idx}
          onClick={(event) => {
            event?.stopPropagation();
            item?.onClick?.(item?.id as string);
            close?.();
          }}
          onKeyDown={() => {}}
          role='button'
        >
          {item?.icon}
          {item?.text}
        </div>
      ))}
    </div>
  );
};

export default Popover;
