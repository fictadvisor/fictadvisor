import { useLayoutEffect, useState } from 'react';
import debounce from 'lodash-es/debounce';

const useIsMobile = (maxWidth): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth <= maxWidth);
    };

    window.addEventListener('resize', debounce(updateSize, 250));
    updateSize();

    return (): void => window.removeEventListener('resize', updateSize);
  }, []);

  return isMobile;
};

export default useIsMobile;
