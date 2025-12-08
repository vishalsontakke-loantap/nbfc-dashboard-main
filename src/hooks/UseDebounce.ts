// hooks/useDebounce.ts
import { useEffect, useState } from "react";

/**
 * Generic debounce hook.
 * Returns the debounced value after `delay` milliseconds.
 *
 * Usage:
 *   const debounced = useDebounce(value, 300);
 */
export default function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedValue;
}
