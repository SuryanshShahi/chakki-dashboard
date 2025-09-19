/* eslint-disable react/no-unstable-nested-components */
'use client';
import useInteractiveStates from '@/app/utils/hooks/interactiveStates';
import { tw } from '@/tailwind.config';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import React, { ReactNode, useEffect, useRef } from 'react';
import Select, { ActionMeta } from 'react-select';

export interface IDropdown {
  value: string;
  label: ReactNode;
}
export interface Option extends IDropdown {
  icon?: ReactNode;
  isFixed?: boolean;
}

export interface OptionCore {
  value: string;
  label: ReactNode;
}

interface DropdownFieldProps extends Partial<FormikProps<any>> {
  name: string;
  options: Option[];
  placeholder?: string;
  isMulti?: boolean;
  max?: number | null;
  onChangeDropdown?: (value: any) => void;
  isDisabled?: boolean;
  emptyMessage?: string;
  removeCat?: boolean;
  image?: string;
  isClearable?: boolean;
  isSearch?: boolean;
  datatestid?: string;
  className?: string;
  wrapperClass?: string;
  label?: string;
  required?: boolean;
}

const DropdownField: React.FC<DropdownFieldProps> = ({
  name,
  options,
  placeholder = 'Select...',
  isMulti = false,
  max = null,
  onChangeDropdown = () => {},
  isDisabled = false,
  emptyMessage,
  removeCat,
  image,
  isClearable,
  isSearch = true,
  datatestid,
  className,
  setFieldValue,
  setFieldTouched,
  values,
  touched,
  errors,
  label,
  required,
  wrapperClass,
}) => {
  const { lostFocus, onBlur, onFocus } = useInteractiveStates();
  const value = values?.[name];
  const error = touched?.[name] && errors?.[name];

  const getRef = useRef<any>(null);

  const checkValueExists = (value: string, options: Option[]) => {
    const isExist = options?.find((el) => el.value === value);
    return { ...isExist };
  };

  const getValueWithFixed = () => {
    if (isMulti) {
      if (value?.length > 0) {
        return value.map((item: Option) => {
          const available = checkValueExists(item.value, options);
          return available
            ? {
                ...item,
                value: available.value,
                label: available.label,
                icon: available.icon,
              }
            : '';
        });
      }
      return [];
    }

    const available =
      value && value?.value ? checkValueExists(value.value, options) : null;

    return available
      ? {
          ...value,
          value: available.value,
          label: available.label,
          icon: available.icon,
        }
      : null;
  };

  useEffect(() => {
    if (removeCat && getRef.current?.props?.name === 'category') {
      getRef.current.select.clearValue();
    }
  }, [removeCat]);

  const onChangeValue = (newValue: any, actionMeta: ActionMeta<Option>) => {
    if (
      (actionMeta.action === 'remove-value' ||
        actionMeta.action === 'pop-value') &&
      actionMeta?.removedValue?.isFixed
    ) {
      return;
    }

    if (isMulti) {
      const value = newValue.map((v: Option) => v);
      setFieldValue?.(name, value.length > 0 ? value : []);
    } else {
      setFieldValue?.(name, newValue);
    }

    onChangeDropdown(newValue);
  };

  return (
    <div
      className={clsx(
        'cursor-pointer space-y-1 text-gray-400 relative px-2 pt-2 border rounded',
        wrapperClass
      )}
    >
      <div className='text-xs md:text-sm -mb-2'>
        {label}
        {required && <span className='text-xs text-red-600'> *</span>}
      </div>
      <div
        className={clsx(
          '  min-h-10 min-w-[200px] text-base relative',
          className
        )}
        role='presentation'
      >
        <Select
          ref={getRef}
          menuPlacement='auto'
          maxMenuHeight={220}
          className={clsx(
            'dropdown-container capitalize block w-full text-base focus-within:outline-none p-0 m-0',
            !lostFocus && '!border-brand',
            'shadow-none disabled:bg-disabled'
          )}
          classNamePrefix='app-select'
          isMulti={isMulti}
          isDisabled={isDisabled}
          isClearable={isClearable || false}
          placeholder={placeholder}
          options={max !== null && value?.length >= max ? [] : options}
          noOptionsMessage={() =>
            max !== null && value?.length >= max
              ? `You can select up to ${max} options only`
              : emptyMessage || 'No options available'
          }
          getOptionLabel={(option) => (option.label as string) || ''}
          getOptionValue={(option) => option.value}
          onChange={onChangeValue}
          value={getValueWithFixed()}
          onFocus={() => {
            onFocus();
          }}
          onBlur={() => {
            setFieldTouched?.(name, true);
            onBlur();
          }}
          id={datatestid}
          name={name}
          styles={{
            control: (base) => ({
              ...base,
              border: 'none',
              boxShadow: 'none',
              margin: 0,
              height: 'max-content',
            }),
            placeholder: (base) => ({
              ...base,
              // by @suryansh
              color: tw.textColor['reddjaksbhdkaj-500'],
            }),
            option: (base) => ({
              ...base,
              color: 'black',
            }),
            valueContainer: (base) => ({
              ...base,
              padding: 0,
            }),
          }}
        />
        <div className='absolute inset-y-0 flex items-center pointer-events-none right-10' />
        {error && (
          <p id={`${name}-error`} className='fp-input-error text-xs mt-2'>
            {error as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default DropdownField;
