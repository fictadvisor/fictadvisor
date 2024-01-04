import { MutableRefObject, RefObject, useEffect } from 'react';

const useOutsideClick = (
  ref: RefObject<HTMLElement> | MutableRefObject<HTMLElement>,
  onClick: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClick();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClick, ref]);
};

export default useOutsideClick;
