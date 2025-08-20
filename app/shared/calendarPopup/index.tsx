import { ChevronLeftIcon, ChevronRightIcon } from '@/app/utils/svgs';
import moment from 'moment';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Value } from 'react-calendar/dist/shared/types.js';

export interface CalendarPopupProps {
  trigger: ReactNode;
  name: string;
  maxDate?: Date;
  minDate?: Date;
  showMonthYearPicker?: boolean;
  onChangeProps?: (date: Date) => void;
  datatestid?: string;
  className?: string;
  disabledDates?: Date[];
  setValue?: any;
  value?: any;
  onChange?: any;
}

const CalendarPopup: React.FC<CalendarPopupProps> = ({
  trigger,
  name,
  maxDate,
  minDate,
  onChange,
  onChangeProps,
  datatestid = '',
  className,
  setValue,
  value,
  disabledDates,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false); // State to control popup visibility
  const calendarRef = useRef<HTMLDivElement>(null); // Ref for detecting outside clicks
  const triggerRef = useRef<HTMLDivElement>(null); // Ref for the trigger element

  const onDateChange = (value: Value) => {
    setIsOpen(false);
    onChangeProps?.(value as Date);
    onChange(value);
  };

  const disableDays = ({ date }: { date: Date }) => {
    return disabledDates
      ? disabledDates?.some((disabledDate) =>
          moment(date).isSame(disabledDate, 'day')
        )
      : false;
  };

  const formatShortWeekday = (locale: string | undefined, date: Date) => {
    const shortWeekday = date.toLocaleDateString(locale, { weekday: 'short' });
    const customWeekdays: Record<string, string> = {
      Mon: 'Mo',
      Tue: 'Tu',
      Wed: 'We',
      Thu: 'Th',
      Fri: 'Fr',
      Sat: 'Sa',
      Sun: 'Su',
    };
    return customWeekdays[shortWeekday] || shortWeekday;
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='inline-block'>
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={() => {}}
        role='button'
      >
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={calendarRef}
          className='calendarPopup absolute z-50 bg-white shadow-lg rounded-md'
        >
          <Calendar
            locale='en'
            onChange={onDateChange}
            value={value || null}
            selectRange={false}
            className='p-2'
            formatShortWeekday={formatShortWeekday}
            formatMonth={(locale, date) =>
              date.toLocaleDateString(locale, { month: 'short' })
            }
            nextLabel={<ChevronRightIcon />}
            prevLabel={<ChevronLeftIcon />}
            maxDate={maxDate}
            minDate={minDate}
            data-testid={datatestid}
            tileDisabled={disableDays}
            defaultValue={value}
            {...rest}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarPopup;
