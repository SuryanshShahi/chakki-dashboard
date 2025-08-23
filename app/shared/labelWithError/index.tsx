import { QuestionCircleIcon } from '@/app/utils/svgs';
import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import Tooltip from '../Tooltip';

export interface LabelWithErrorProps {
  name: string;
  label?: string;
  errorMessage?: string | null;
  className?: string;
  children?: ReactNode;
  required?: boolean;
  infoIcon?: boolean;
  helperText?: string;
  styleLabel?: string;
  tooltip?: string;
  wrapperClassName?: string;
}

const LabelWithError: React.FC<LabelWithErrorProps> = ({
  name,
  label,
  errorMessage,
  className = 'relative block w-full',
  children,
  required = false,
  infoIcon = false,
  helperText,
  styleLabel,
  tooltip,
  wrapperClassName,
}) => {
  return (
    <div className={clsx('w-full', wrapperClassName)}>
      <label htmlFor={name} className={className}>
        {label && (
          <div className='app-form-wrapper'>
            <span className='mb-1 flex space-x-1 items-center'>
              <span
                className={clsx(
                  'text-sm font-medium text-secondary flex gap-x-1',
                  styleLabel
                )}
              >
                {label}{' '}
                {required ? <span className='text-red-500'>*</span> : null}{' '}
                {Boolean(tooltip) && (
                  <Tooltip title={tooltip} variant='top' size='sm'>
                    <BsInfoCircle size={12} />
                  </Tooltip>
                )}
              </span>
              {infoIcon ? <QuestionCircleIcon /> : null}
            </span>
          </div>
        )}
        {children}
        {errorMessage && (
          <p
            id={`${name}-error`}
            className='app-error-text'
            data-testid={`${name}-error`}
          >
            {errorMessage}
          </p>
        )}
        {helperText && (
          <p
            id={`${name}-helperText`}
            className='app-helperText-text'
            data-testid={`${name}-helperText`}
          >
            {helperText}
          </p>
        )}
      </label>
    </div>
  );
};

export default LabelWithError;
