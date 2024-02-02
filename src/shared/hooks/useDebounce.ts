import { useCallback, useEffect, useState } from 'react';

function useDebounce<T>(
  defaultValue: T,
  delay: number,
): [T, (newValue: T, callback?: (debouncedValue: T) => void) => void, T] {
  const [value, setValue] = useState<T>(defaultValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(defaultValue);

  const [callback, setCallback] = useState<
    ((debouncedValue: T) => void) | null
  >(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      if (callback) {
        callback(value);
        setCallback(null);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, callback]);

  const setBoth = useCallback(
    (newValue: T, newCallback?: (debouncedValue: T) => void) => {
      setValue(newValue);
      if (newCallback) {
        setCallback(() => newCallback);
      }
    },
    [],
  );

  return [debouncedValue, setBoth, value];
}

export default useDebounce;
