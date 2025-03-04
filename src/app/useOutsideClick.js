import { useEffect, useRef } from 'react';

export const useOutsideClick = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (ref.current != null && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [callback]);

  return ref;
};
