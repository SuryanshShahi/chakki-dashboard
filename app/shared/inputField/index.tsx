'use client';
import clsx from 'clsx';
import React, {
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { PiWarningCircleFill } from 'react-icons/pi';
import { SlArrowRight } from 'react-icons/sl';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  icon?: React.ReactNode;
  label?: string;
  wrapperClass?: string;
  onChange?: (val: any) => void;
  onClick?: React.MouseEventHandler;
  countryCode?: { name: string; flag: string; code: string; dial_code: string };
  setCountryCode?: (item: {
    name: string;
    flag: string;
    code: string;
    dial_code: string;
  }) => void;
  suffix?: ReactNode;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const {
      type = 'text',
      onChange,
      onBlur,
      errorMessage,
      icon,
      value,
      label,
      wrapperClass,
      onClick,
      countryCode,
      setCountryCode,
      disabled,
      required,
      suffix,
      ...rest
    } = props;
    const [inputType, setInputType] = useState(type);
    const handleVisibility = () => {
      if (inputType === 'password') {
        setInputType('text');
      } else {
        setInputType('password');
      }
    };

    useEffect(() => {
      setInputType(type);
    }, [type]);

    return (
      <div
        className={clsx('cursor-pointer space-y-1 text-gray-400', wrapperClass)}
        onClick={onClick}
      >
        <div className='text-xs md:text-sm'>
          {label}
          {required && <span className='text-xs text-red-600'> *</span>}
        </div>
        <div className={clsx('flex gap-x-4', value && '!text-black')}>
          <div className='relative flex w-full cursor-pointer items-center'>
            <input
              value={value}
              onChange={(e) => onChange && onChange(e?.target.value)}
              onBlur={(e) => onBlur && onBlur(e)}
              className={clsx(
                'w-full bg-transparent pr-5 text-sm outline-none md:text-base',
                disabled && 'text-gray-400 pointer-events-none'
              )}
              type={inputType}
              ref={ref}
              {...rest}
            />
            <div
              className='absolute right-0 w-fit cursor-pointer'
              onClick={() => type === 'password' && handleVisibility()}
            >
              {type === 'password' ? (
                inputType === 'password' ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )
              ) : icon ? (
                icon
              ) : onClick ? (
                <SlArrowRight
                  size={14}
                  className={`ml-auto rotate-90 text-gray-400`}
                />
              ) : errorMessage ? (
                <PiWarningCircleFill className='text-red-600' />
              ) : null}
            </div>
          </div>
        </div>
        {errorMessage && (
          <div className='text-xs text-red-600'>{errorMessage}</div>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;
