import clsx from 'clsx';
import { FormikProps } from 'formik';
import React, { ReactNode } from 'react';
import { FaCheck } from 'react-icons/fa6';

interface CheckboxProps extends Partial<FormikProps<any>> {
  disabled?: boolean;
  label?: ReactNode;
  styleLabel?: string;
  className?: string;
  name: string;
  checked?: boolean
}

const Checkbox: React.FC<CheckboxProps> = ({
  disabled,
  label,
  styleLabel,
  className,
  setFieldValue,
  handleChange,
  handleBlur,
  values,
  name,
  checked,
  ...rest
}) => {
  const handleToggle = () => {
    if (!disabled) {
      setFieldValue?.(name, !checked);
    }
  };

  return (
    <div
      className={clsx(
        'flex space-x-3 rounded-lg cursor-pointer w-full items-center',
        className
      )}
      role='presentation'
    >
      <input
        type='checkbox'
        hidden
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div
        className={clsx(
          'rounded-[6px] border h-5 duration-300 min-w-5 flex justify-center items-center',
          checked ? 'border-brand bg-brand-solid' : 'border-primary',
          disabled && 'border-disabled bg-disabled'
        )}
        onClick={handleToggle}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleToggle()}
      >
        {checked && (
          <FaCheck
            size={12}
            className={clsx('text-white', disabled && '!text-disabled')}
          />
        )}
      </div>
      {typeof label === 'string' ? (
        <label
          htmlFor={name}
          className={clsx(
            'text-base text-secondary cursor-pointer font-medium leading-6',
            styleLabel
          )}
        >
          {label}
        </label>
      ) : (
        label
      )}
    </div>
  );
};

export default Checkbox;
