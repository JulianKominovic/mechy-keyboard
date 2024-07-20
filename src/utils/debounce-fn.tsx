import { useRef, useState, useEffect } from "react";

export function useDebounceFunction(delay: number) {
  const timeoutId = useRef<number | null>(null);
  const [init, setInit] = useState(() => () => {});
  const debounce = (callback: () => any) => {
    setInit(() => callback);
  };

  useEffect(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(init, delay) as any;
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId.current as any);
      }
    };
  }, [init]);

  return {
    debounce,
  };
}
