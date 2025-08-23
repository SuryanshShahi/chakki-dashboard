import { CloseIcon, WatchIcon } from '@/app/utils/svgs';
import clsx from 'clsx';
import { FormikProps } from 'formik';
import 'react-clock/dist/Clock.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

interface TimePickerFieldProps extends FormikProps<any> {
  name: string;
  format?: '24-hour' | '12-hour';
  className?: string;
  minTime?: string;
  maxTime?: string;
  hourPlaceholder?: string;
  minutePlaceholder?: string;
  dataTestId?: string;
  disabled?: boolean;
}

const TimePickerField = ({
  name,
  format = '12-hour',
  className = '',
  maxTime,
  minTime,
  hourPlaceholder,
  minutePlaceholder,
  disabled,
  setFieldTouched,
  setFieldValue,
  touched,
  errors,
  values,
}: TimePickerFieldProps) => {
  return (
    <div className={className}>
      <TimePicker
        onChange={(value) => setFieldValue(name, value || '')}
        value={values?.[name] || '00:00'}
        format={format === '24-hour' ? 'HH:mm' : 'hh:mm a'}
        onBlur={() => setFieldTouched(name, true)}
        className={clsx(
          'text-primary bg-white px-2 border min-h-10 text-sm focus:outline-none focus:ring-0 w-full rounded-lg shadow-none disabled:bg-disabled disabled:text-[#B4B4B]',
          touched?.[name] && errors?.[name] ? 'border-error' : '!border-primary'
        )}
        maxTime={maxTime}
        minTime={minTime}
        hourPlaceholder={hourPlaceholder}
        minutePlaceholder={minutePlaceholder}
        clockIcon={<WatchIcon />}
        clearIcon={<CloseIcon />}
        disableClock={true}
        disabled={disabled}
      />
      {touched?.[name] && errors?.[name] && (
        <p className='text-error text-xs mt-1'>{errors[name] as string}</p>
      )}
    </div>
  );
};

export default TimePickerField;
