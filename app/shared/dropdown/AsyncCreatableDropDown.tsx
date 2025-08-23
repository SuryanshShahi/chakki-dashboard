import useInteractiveStates from '@/app/utils/hooks/interactiveStates';
import { CheckIcon } from '@/app/utils/svgs';
import { tw } from '@/tailwind.config';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import Image from 'next/image';
import React, { ReactNode, useState } from 'react';
import { PiWarningCircleFill } from 'react-icons/pi';
import { SlArrowRight } from 'react-icons/sl';
import Select, {
  ActionMeta,
  OptionProps,
  SingleValue,
  components,
} from 'react-select';
import { OptionCore } from '.';
import NameInitial from '../nameInitial/NameInitial';

export interface Option extends OptionCore {
  icon?: React.ReactNode;
  htmlLabel?: string | TrustedHTML;
  avatarSrc?: string;
  nameInitial?: string;
  isFixed?: boolean;
  isNewAdded?: boolean;
}

interface DropdownFieldProps extends FormikProps<any> {
  name: string;
  options: Option[];
  placeholder?: string;
  onChangeDropdown?: (value: any) => void;
  isDisabled?: boolean;
  isMulti?: boolean;
  useInternalState?: boolean;
  isClearable?: boolean;
  dataTestId?: string;
  className?: string;
  isLoading?: boolean;
  onLoadOptions: (searchKey: any) => void;
  onCreateNew?: (name: any) => void;
  value?: any;
  label?: string | ReactNode;
  required?: boolean;
  wrapperClass?: string;
  icon?: ReactNode;
}

const AsyncCreatableDropDown: React.FC<DropdownFieldProps> = ({
  name,
  options,
  placeholder,
  isDisabled = false,
  isMulti = false,
  useInternalState = true,
  isClearable = false,
  className,
  onChangeDropdown,
  onLoadOptions,
  onCreateNew,
  isLoading,
  dataTestId,
  value,
  touched,
  errors,
  setFieldValue,
  setFieldTouched,
  label,
  required,
  wrapperClass,
  icon,
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  const { lostFocus } = useInteractiveStates();

  const handleInputChange = (val: string) => {
    setInputValue(val);
    if (val) {
      onLoadOptions(val);
    }
  };

  const handleChange = (
    selectedOption: SingleValue<OptionCore>,
    actionMeta: ActionMeta<Option>
  ) => {
    if (selectedOption) {
      if (selectedOption?.value === 'add-new') {
        onCreateNew && onCreateNew(inputValue);
      } else {
        if (useInternalState) {
          setFieldValue(
            name,
            isMulti ? [...(value || []), selectedOption] : selectedOption
          );
        }
        onChangeDropdown &&
          onChangeDropdown(
            isMulti ? [...(value || []), selectedOption] : selectedOption
          );
      }
    }
  };

  const customOption = (props: OptionProps<Option>) => (
    <components.Option {...props}>
      <div className='flex justify-between items-center'>
        <div className='flex space-x-4 items-center'>
          {props.data?.avatarSrc ? (
            <Image
              src={props.data?.avatarSrc}
              height={32}
              width={32}
              alt='menu-drop-avatar'
              className='rounded-full min-w-8 h-8'
              objectFit='cover'
            />
          ) : props.data?.nameInitial ? (
            <NameInitial name={props.data?.nameInitial} type='drop_menu_list' />
          ) : props.data?.icon ? (
            <span>{props.data.icon}</span>
          ) : null}
          <div
            dangerouslySetInnerHTML={{
              __html: (props.data.htmlLabel
                ? props.data.htmlLabel
                : props.data.label) as string,
            }}
          />
        </div>
        {isMulti &&
          value?.some((opt: Option) => opt.value === props.data.value) && (
            <CheckIcon />
          )}
        {!isMulti && value?.value === props?.data.value && <CheckIcon />}
      </div>
    </components.Option>
  );

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
          'app-select-wrapper min-h-10 min-w-[200px] text-base relative',
          className
        )}
        role='presentation'
      >
        <Select
          isLoading={isLoading}
          menuPlacement='auto'
          maxMenuHeight={220}
          className={clsx(
            'dropdown-container capitalize block w-full text-base focus-within:outline-none p-0 m-0',
            !lostFocus && '!border-brand',
            'shadow-none disabled:bg-disabled'
          )}
          classNamePrefix='app-select'
          isDisabled={isDisabled}
          isClearable={isClearable}
          placeholder={placeholder}
          options={options}
          onInputChange={handleInputChange}
          onChange={(val, action) => {
            handleChange(val as SingleValue<OptionCore>, action);
            setFieldTouched(name, true);
          }}
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
          onBlur={() => setFieldTouched(name, true, true)}
          getOptionLabel={(option) => {
            return (option.label as string) || '';
          }}
          getOptionValue={(option) => {
            return option.value;
          }}
          components={{ DropdownIndicator: null, Option: customOption }}
          hideSelectedOptions={false}
          controlShouldRenderValue={!isMulti}
          inputValue={inputValue}
          menuIsOpen={undefined}
          filterOption={() => true}
          id={`${dataTestId}`}
          name={name}
          value={value || (isMulti ? [] : null)}
        />
        {icon ? (
          <SlArrowRight
            size={14}
            className={`ml-auto rotate-90 text-gray-400 absolute right-0 top-[25%]`}
          />
        ) : touched?.[name] && errors?.[name] ? (
          <PiWarningCircleFill className='text-red-600 absolute right-0 top-[25%]' />
        ) : null}
      </div>
      {touched?.[name] && errors?.[name] && (
        <span className='text-xs text-red-600 relative bottom-2'>
          {errors[name] as string}
        </span>
      )}
    </div>
  );
};

export default AsyncCreatableDropDown;
