import useInteractiveStates from '@/app/utils/hooks/interactiveStates';
import { CheckIcon } from '@/app/utils/svgs';
import clsx from 'clsx';
import { useField } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react';
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

interface DropdownFieldProps {
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
}

const AsyncCreatableDropDown: React.FC<DropdownFieldProps> = ({
  name,
  options,
  placeholder,
  isDisabled = false,
  isMulti = true,
  useInternalState = true,
  isClearable = false,
  className,
  onChangeDropdown,
  onLoadOptions,
  onCreateNew,
  isLoading,
  dataTestId,
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  const { lostFocus, onBlur, onFocus } = useInteractiveStates();

  // ✅ Replace React Hook Form’s useController with Formik’s useField
  const [field, meta, helpers] = useField<any>(name);
  const { value } = field;
  const { setValue, setTouched } = helpers;

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
        if (useInternalState)
          setValue(
            isMulti ? [...(value || []), selectedOption] : selectedOption
          );
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
          ) : (
            <></>
          )}
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
          'dropdown-container placeholder:text-base placeholder:!text-placeholder capitalize block w-full text-base border border-primary rounded-lg focus-within:outline-none',
          meta.error
            ? `${lostFocus ? '!border-error' : '!border-brand'}`
            : (!lostFocus && '!border-brand') || '',
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
          setTouched(true);
        }}
        getOptionLabel={(option) => option.label as string}
        getOptionValue={(option) => option.value}
        components={{ DropdownIndicator: null, Option: customOption }}
        hideSelectedOptions={false}
        controlShouldRenderValue={!isMulti}
        inputValue={inputValue}
        menuIsOpen={inputValue.length > 0}
        filterOption={() => true} // disable internal filtering
        id={`${dataTestId}`}
        name={name}
        value={value || (isMulti ? [] : null)} // ✅ controlled by Formik
      />
      {meta.touched && meta.error && (
        <span className='text-error text-sm'>{meta.error}</span>
      )}
    </div>
  );
};

export default AsyncCreatableDropDown;
