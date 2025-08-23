/* eslint-disable react/no-unstable-nested-components */
'use client';
import useInteractiveStates from '@/app/utils/hooks/interactiveStates';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import Image from 'next/image';
import React, { ReactNode, useEffect, useRef } from 'react';
import Select, { ActionMeta, StylesConfig } from 'react-select';

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
  styles?: StylesConfig<Option, boolean>;
  isSearch?: boolean;
  datatestid?: string;
  className?: string;
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
  styles = {},
  isSearch = true,
  datatestid,
  className,
  setFieldValue,
  setFieldTouched,
  values,
  touched,
  errors,
}) => {
  const { lostFocus, onBlur, onFocus } = useInteractiveStates();
  const value = values?.[name];
  const error = touched?.[name] && errors?.[name];
  console.log({error});
  

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
        'app-select-wrapper min-h-10 min-w-[200px] text-base relative',
        className,
        image && 'app-select-with-image'
      )}
      role='presentation'
    >
      {image && (
        <Image
          width={20}
          height={20}
          src={image}
          alt=''
          className='absolute left-3 z-10 top-[10px]'
        />
      )}
      <Select
        ref={getRef}
        styles={styles}
        menuPlacement='auto'
        minMenuHeight={300}
        maxMenuHeight={220}
        className={clsx(
          'dropdown-container placeholder:text-base placeholder:!text-placeholder capitalize block w-full text-base border border-primary rounded-lg focus-within:outline-none',
          error
            ? `${lostFocus ? '!border-error' : '!border-brand'}`
            : (!lostFocus && '!border-brand') || '',
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
        // getOptionLabel={(option) => {
        //   return isSearch === false ? (
        //     <div style={{ display: 'flex', alignItems: 'center' }}>
        //       {option.icon}
        //       <span style={{ marginLeft: 8 }}>{option.label}</span>
        //     </div>
        //   ) : (
        //     option.label
        //   );
        // }}
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
      />
      <div className='absolute inset-y-0 flex items-center pointer-events-none right-10' />
      {/* {error && lostFocus && (
        <p id={`${name}-error`} className='fp-input-error text-xs mt-2'>
          {error}
        </p>
      )} */}
    </div>
  );
};

export default DropdownField;
