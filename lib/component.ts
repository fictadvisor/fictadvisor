import { useState, useEffect, useRef } from 'react';

// Source: https://stackoverflow.com/a/45323523
export const useComponentVisible = (initialIsVisible) => {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);
    const ignoreRef = useRef(null);

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && (!ignoreRef.current || !ignoreRef.current.contains(event.target))) {
        setIsComponentVisible(false);
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside, true);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside, true);
      };
    }, [ref]);

    return { ref, ignoreRef, isComponentVisible, setIsComponentVisible };
};

export const mergeClassName = (defaultValue: string, className: string) => {
  if (!className) {
    return defaultValue;
  }

  return `${defaultValue} ${className}`;
};
