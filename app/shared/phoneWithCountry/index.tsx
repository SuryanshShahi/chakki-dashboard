'use client';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import { PiWarningCircleFill } from 'react-icons/pi';
import PhoneInput, { CountryData } from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';

interface PhoneWithCountryProps extends FormikProps<any> {
  name: string;
  dialName: string;
  value?: string | null;
  className?: string;
  disabled?: boolean;
  disableDropdown?: boolean;
  helperText?: string;
  placeholder?: string;
  onlyCountries?: string[];
  onChange?: (phone: string, code: string) => void;
  dataTestId?: string;
  handleEnterKeyPressed?: () => void;
  label?: string;
  required?: boolean;
}

export const PhoneWithCountry = ({
  name,
  dialName,
  value,
  className = '',
  disabled,
  disableDropdown = false,
  placeholder = 'Enter phone number',
  helperText = '',
  label,
  required,
  onChange,
  setFieldValue,
  handleBlur,
  handleEnterKeyPressed,
  onlyCountries = undefined,
  errors,
  touched,
}: PhoneWithCountryProps) => {
  const handleOnchange = (value: string, country: CountryData) => {
    const phone = value.slice(country?.dialCode?.length);
    const code = `+${country?.dialCode}`;
    name && setFieldValue?.(name, phone);
    dialName && setFieldValue?.(dialName, code);
    onChange?.(phone, code);
  };

  const error = errors?.[name] && touched?.[name] ? errors[name] : '';
  return (
    <div className='relative w-full border p-2 rounded' role='presentation'>
      <div className='text-xs md:text-sm text-gray-400'>
        {label}
        {required && <span className='text-xs text-red-600'> *</span>}
      </div>
      <PhoneInput
        inputClass={clsx(
          'phoneInput !h-11 !border-none',
          error ? `!border-error` : '',
          className
        )}
        dropdownClass='countryDropdown'
        searchClass='phoneSearchInput'
        onlyCountries={onlyCountries}
        value={value}
        disableDropdown={disableDropdown}
        disabled={disabled}
        placeholder={placeholder}
        onBlur={handleBlur(name)}
        enableSearch
        onChange={(value, country) =>
          handleOnchange(value, country as CountryData)
        }
        onEnterKeyPress={handleEnterKeyPressed}
        countryCodeEditable={false}
      />
      {helperText && <div className='text-xs'>{helperText}</div>}
      {error && <div className='text-xs text-red-600'>{error as string}</div>}
      {error ? (
        <div className='absolute top-1/2 right-2'>
          <PiWarningCircleFill className='text-red-600' />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
