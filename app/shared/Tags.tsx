import { tw } from '@/tailwind.config';
import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';
import { SvgCross } from '../utils/svgs';
import Img from './Img';

export interface ITags {
  title: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  count?: string | number;
  image?: string;
  className?: string;
  styleImage?: string;
  showText?: boolean;
}

const Tags: FC<PropsWithChildren<ITags>> = ({
  title,
  size = 'md',
  onClick,
  count,
  image,
  className,
  children,
  styleImage,
  showText,
}) => {
  return (
    <div
      className={clsx(
        'border border-primary w-max text-secondary h-max flex items-center rounded-[6px] font-medium text-sm',
        {
          'gap-x-1': size === 'sm',
          'gap-x-[5px]': size === 'md',
          'gap-x-[6px]': size === 'lg',
        },
        { '!text-xs': size === 'sm' },
        { 'cursor-pointer': onClick },
        onClick && image
          ? {
              'px-1 py-[3px]': size === 'sm',
              'px-[5px] py-[2px]': size === 'md',
              'px-[7px] py-1': size === 'lg',
            }
          : count
          ? {
              'pl-[6px] pr-1 py-[3px]': size === 'sm',
              'pl-[9px] pr-[3px] py-[2px]': size === 'md',
              'pl-[10px] pr-1 py-1': size === 'lg',
            }
          : {
              'px-2 py-[3px]': size === 'sm',
              'px-[9px] py-[2px]': size === 'md',
              'px-[10px] py-1': size === 'lg',
            },
        className
      )}
      onClick={onClick}
      onKeyDown={() => {}}
      role='button'
    >
      {image ? (
        <Img
          src={image}
          height={24}
          width={24}
          alt=''
          className={clsx('rounded-full h-4 w-4', styleImage)}
          isLocal
        />
      ) : (
        showText && (
          <div
            className={clsx(
              'h-6 w-6 flex justify-center items-center text-xs font-semibold uppercase text-brand-tertiary bg-brand-primary rounded-full border-[0.5px] border-brand-secondary',
              styleImage
            )}
          >
            {title?.charAt(0)}
          </div>
        )
      )}
      {title}

      {onClick && (
        <SvgCross
          height={14}
          width={14}
          stroke={tw.textColor['quaternary']}
          className={clsx({
            'text-[10px]': size === 'sm',
            'text-xs': size === 'md',
            'text-sm': size === 'lg',
          })}
        />
      )}
      {count && (
        <div
          className={clsx(
            'rounded-[3px] bg-quaternary flex justify-center items-center text-xs',
            {
              'text-sm': size === 'lg',
            },
            {
              'h-4 w-4': size === 'sm',
              'h-[18px] w-[18px]': size === 'md',
              'h-5 w-5': size === 'lg',
            }
          )}
        >
          {count}
        </div>
      )}
      {children}
    </div>
  );
};

export default Tags;
