import { FormikProps } from 'formik';
import React, { ChangeEvent, ReactNode } from 'react';

interface RadioProps extends Omit<Partial<FormikProps<any>>, 'handleChange'> {
  disabled?: boolean;
  label?: ReactNode;
  styleLabel?: string;
  className?: string;
  name: string;
  isChecked?: boolean;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Radio: React.FC<RadioProps> = ({
  disabled,
  label,
  styleLabel,
  className,
  setFieldValue,
  handleChange,
  handleBlur,
  values,
  name,
  isChecked,
  ...rest
}) => {
  const value = values[name];

  return (
    <div className='flex items-center gap-x-1'>
      <input
        id={name}
        type='radio'
        value={value}
        checked={isChecked}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        className='h-4 w-4 border-gray-300 bg-gray-100 accent-primary-600'
      />
      <label htmlFor='radio1' className='text-sm md:text-base'>
        {label}
      </label>
    </div>
  );
};

export default Radio;
