import {useEffect, useState} from 'react';

export default function useDebounce<T>(value: T, delay: number): T {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timeout on unmount or value change
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  // Return the debounced value
  return debouncedValue;
}
