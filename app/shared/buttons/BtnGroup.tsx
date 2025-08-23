import clsx from 'clsx';
import { Fragment } from 'react';
import { ISelected } from '../table/types';
import Button from './Button';

const BtnGroup = ({
  buttons,
  onClick,
  selected,
  className,
  styleBtn,
}: {
  buttons: ISelected[];
  onClick: (btn: ISelected) => void;
  selected: string;
  className?: string;
  styleBtn?: string;
}) => {
  return (
    <div
      className={clsx(
        'border flex w-max bg-white border-primary rounded-lg [&>*:first-child]:!rounded-l-lg [&>*:last-child]:!rounded-r-lg',
        className
      )}
    >
      {buttons?.map((item, idx) => (
        <Fragment key={item?.value}>
          <Button
            btnName={item?.label}
            variant={item?.value === selected ? 'secondary-color' : 'secondary'}
            className={clsx(
              '!border-none rounded-none',
              item?.value === selected && 'bg-btn-secondary-color-hover',
              styleBtn
            )}
            onClick={() => onClick(item)}
            key={item?.value}
          />
          {idx !== buttons?.length - 1 && (
            <div className='min-h-full w-[1px] border-r border-r-primary' />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default BtnGroup;
