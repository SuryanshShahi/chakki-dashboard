import clsx from 'clsx';
import Img from './Img';
import { ReactNode } from 'react';
import { RxCross2 } from 'react-icons/rx';

export enum ChipVariant {
  Gray = 'gray',
  Brand = 'brand',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
  Blue = 'blue',
  Purple = 'purple',
  Pink = 'pink',
  Orange = 'orange',
}

export interface IChip {
  title: ReactNode;
  image?: string | ReactNode;
  styleImage?: string;
  variant?:
    | 'gray'
    | 'brand'
    | 'error'
    | 'warning'
    | 'success'
    | 'blue'
    | 'purple'
    | 'pink'
    | 'orange';
  type?: 'tag' | 'image' | 'primary';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  outlined?: boolean;
  className?: string;
  onClick?: () => void;
  handleRemove?: () => void;
}
const Chip = ({
  title,
  image,
  variant = 'brand',
  type,
  size = 'md',
  outlined,
  className,
  onClick,
  handleRemove,
  styleImage,
}: IChip) => {
  return (
    <div
      onClick={onClick}
      onKeyDown={() => {}}
      role='button'
      className={clsx(
        onClick && 'cursor-pointer',
        'border text-nowrap w-max h-max gap-x-[6px] flex items-center capitalize rounded-[6px] font-medium',
        outlined
          ? 'border-primary bg-primary text-gray-700 shadow-xs'
          : {
              'border-gray-200 bg-gray-50 text-gray-700': variant === 'gray',
              'border-utility-brand-200 bg-utility-brand-50 text-utility-brand-700':
                variant === 'brand',
              'border-utility-error-200 bg-utility-error-50 text-utility-error-700':
                variant === 'error',
              'border-utility-warning-200 bg-utility-warning-50 text-utility-warning-700':
                variant === 'warning',
              'border-utility-success-200 bg-utility-success-50 text-utility-success-700':
                variant === 'success',
              'border-utility-blue-200 bg-utility-blue-50 text-utility-blue-700':
                variant === 'blue',
              'border-utility-purple-200 bg-utility-purple-50 text-utility-purple-700':
                variant === 'purple',
              'border-utility-pink-200 bg-utility-pink-50 text-utility-pink-700':
                variant === 'pink',
              'border-utility-orange-200 bg-utility-orange-50 text-utility-orange-700':
                variant === 'orange',
            },
        { 'text-xs': size === 'xs' },
        { 'text-sm': size === 'sm' || size === 'md' },
        { 'text-base': size === 'lg' },
        image
          ? {
              'px-1 py-[2px]': size === 'sm' || size === 'xs',
              'px-[6px] py-[2px]': size === 'md',
              'px-2 py-1': size === 'lg',
            }
          : {
              'px-[6px] py-[2px]': size === 'sm' || size === 'xs',
              'px-2 py-[2px]': size === 'md',
              'px-[10px] py-1': size === 'lg',
            },
        className
      )}
    >
      {type === 'tag' && (
        <div
          className={clsx('h-[7px] w-[7px] rounded-full', {
            'bg-gray-500': variant === 'gray',
            'bg-utility-brand-500': variant === 'brand',
            'bg-utility-error-500': variant === 'error',
            'bg-utility-warning-500': variant === 'warning',
            'bg-utility-success-500': variant === 'success',
            'bg-utility-blue-500': variant === 'blue',
            'bg-utility-purple-500': variant === 'purple',
            'bg-utility-pink-500': variant === 'pink',
            'bg-utility-orange-500': variant === 'orange',
          })}
        />
      )}
      {typeof image === 'string' ? (
        <Img
          src={image}
          height={24}
          width={24}
          alt=''
          className={clsx('rounded-full h-4 w-4', styleImage)}
          isLocal
        />
      ) : (
        image
      )}
      {title}
      {handleRemove && <RxCross2 onClick={handleRemove} />}
    </div>
  );
};

export default Chip;
