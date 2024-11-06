import { useEffect } from 'react';

export const useKeyDown = (
  key: KeyboardEvent['key'],
  fn: () => void,
  deps: any[] = [],
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === key) {
        fn();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, deps);
};
