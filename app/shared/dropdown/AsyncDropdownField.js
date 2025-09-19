/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';
import Image from 'next/image';
import useInteractiveStates from 'src/hooks/interactiveStates';
import { AsyncPaginate } from 'react-select-async-paginate';

function AsyncDropdownField({
  control,
  name,
  options,
  placeholder,
  isMulti,
  max,
  onChangeDropdown,
  isDisabled,
  emptyMessage,
  removeCat,
  image,
  isClearable,
  styles,
  isSearch,
  datatestid,
  menuPlacement,
}) {
  const { lostFocus, onBlur, onFocus } = useInteractiveStates();

  const {
    field: { ref, value, onChange, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: '',
  });

  const checkValueExists = (value, options) => {
    const isExist =
      options && options.length > 0
        ? options?.find((el) => {
            return el?.value === value;
          })
        : null;
    return { ...isExist };
  };

  // if you want some selected options should not be able to delete then add isFixed property with true in value object
  const getValueWithFixed = (isMulti, options) => {
    if (isMulti) {
      // value check for mulltiselect dropdown
      if (value !== null && value !== '' && value !== undefined) {
        const arr =
          value?.length > 0
            ? value?.map((item) => {
                // check if selected value exist in the options list
                const available = checkValueExists(item?.value, options);
                if (available) {
                  return {
                    ...item,
                    value: available?.value,
                    label: available?.label,
                    icon: available?.icon,
                  };
                }
                return '';
              })
            : [];
        return arr;
      }
    }
    // value check for single value select dropdown
    // check if selected value exist in the options list
    const available =
      value !== null && value !== ''
        ? checkValueExists(value.value, options)
        : false;
    if (available) {
      return {
        ...value,
        value: available.value,
        label: available.label,
        icon: available?.icon,
      };
    }
    return null;
  };
  // this style used for removing delete cross icon from selected options where it have isFixed property true

  const getRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    removeCat &&
      getRef.current.props.name === 'category' &&
      getRef.current.select.clearValue();
  }, [getRef, removeCat]);

  const onChangeValue = (newValue, actionMeta) => {
    if (
      actionMeta.action === 'remove-value' || // condition used fixed value should not be popped and removed
      actionMeta.action === 'pop-value'
    ) {
      if (
        styles?.multiValueRemove !== undefined &&
        actionMeta?.removedValue?.isFixed
      )
        return;
    }
    if (isMulti === true) {
      const value = newValue.map((v) => v);
      onChange(value.length > 0 ? value : []);
    } else {
      onChange(newValue);
    }
    if (onChangeDropdown) {
      onChangeDropdown(newValue);
    }
  };

  function loadListOptions(search, prevOptions) {
    let filteredOptions = [];
    if (!search) {
      filteredOptions = options;
    } else {
      const searchLower = search.toLowerCase();

      filteredOptions = options.filter(({ label }) =>
        label.toLowerCase().includes(searchLower)
      );
    }

    const hasMore = filteredOptions.length > prevOptions.length + 20;
    const slicedOptions = filteredOptions.slice(
      prevOptions.length,
      prevOptions.length + 20
    );

    return {
      options: slicedOptions,
      hasMore,
    };
  }

  return (
    <div
      className={`min-h-10 md:text-sm lg:text-base ${
        image
          ? 'h-10 md:text-sm lg:text-base flex items-center md:space-x-4'
          : ''
      } ${name?.replace(/[[\].]+/g, '_')}`}
      role='presentation'
    >
      {image ? (
        <Image
          width={50}
          height={50}
          src='/icons/location.svg'
          alt=''
          className='h-4 absolute left-7 md:left-32 z-10'
        />
      ) : (
        ''
      )}
      <AsyncPaginate
        ref={getRef}
        styles={styles}
        menuPlacement={menuPlacement}
        minMenuHeight={180}
        maxMenuHeight={200}
        className={`dropdown-container capitalize block w-full text-base bg-white ${
          isDisabled ? 'px-0' : 'px-4'
        } border-[0.4px] border-gray-400 rounded-lg text-sm focus-within:outline-none ${
          error && lostFocus
            ? 'text-red'
            : (value && lostFocus && 'border ') || ''
        } shadow-none disabled:bg-disabled`}
        classNamePrefix='app-select'
        isMulti={isMulti}
        isDisabled={isDisabled}
        isClearable={isClearable}
        placeholder={placeholder}
        loadOptions={loadListOptions}
        noOptionsMessage={() =>
          value && value.length >= max && max !== null
            ? `You can select up to ${max} options only`
            : emptyMessage || 'No options available'
        }
        getOptionLabel={(option) =>
          !isSearch ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>{option.icon}</div>
              <span style={{ marginLeft: 8 }}>{option.label}</span>
            </div>
          ) : (
            option.label
          )
        }
        getOptionValue={(option) => option.value}
        onChange={(val, action) => {
          onChangeValue(val, action);
        }}
        defaultValue={getValueWithFixed(isMulti, options)}
        value={getValueWithFixed(isMulti, options)}
        {...inputProps}
        onFocus={onFocus}
        onBlur={onBlur}
        id={`${datatestid}`}
      />
      <div className='absolute inset-y-0 flex items-center pointer-events-none right-10' />
    </div>
  );
}

AsyncDropdownField.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  menuPlacement: PropTypes.string,
  options: PropTypes.array,
  isMulti: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  max: PropTypes.number,
  onChangeDropdown: PropTypes.func,
  styles: PropTypes.object,
  isSearch: PropTypes.bool,
};

AsyncDropdownField.defaultProps = {
  placeholder: 'Select...',
  options: [],
  isMulti: false,
  isDisabled: false,
  max: null,
  isClearable: true,
  onChangeDropdown: () => {},
  styles: {},
  isSearch: true,
  menuPlacement: 'auto',
};

export default AsyncDropdownField;
