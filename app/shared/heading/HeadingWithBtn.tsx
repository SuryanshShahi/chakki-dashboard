import clsx from 'clsx';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';
import Heading, { HeadingProps } from './Heading';
import Button, { IButton } from '../buttons/Button';

export interface IHeadingWithBtnProps {
  className?: string;
  btnText?: string;
  path?: string;
  headingProps?: HeadingProps;
  btnProps?: IButton | null;
  btnVariant?: 'button' | 'link';
  styleBtn?: string;
}

const HeadingWithBtn: FC<PropsWithChildren<IHeadingWithBtnProps>> = ({
  children,
  className,
  btnText,
  path,
  headingProps,
  btnProps,
  btnVariant = 'link',
  styleBtn,
}) => {
  return (
    <div className={clsx('flex items-center justify-between', className)}>
      <Heading
        {...headingProps}
        className={clsx('text-xl', headingProps?.className)}
      >
        {headingProps?.children}
      </Heading>
      {Boolean(children) ? (
        children
      ) : btnVariant === 'button' && btnProps ? (
        <Button {...btnProps} />
      ) : btnVariant === 'link' && btnText ? (
        <Link
          href={path || ''}
          className={clsx(
            'font-semibold text-sm text-brand-tertiary',
            styleBtn
          )}
        >
          {btnText}
        </Link>
      ) : null}
    </div>
  );
};

export default HeadingWithBtn;
