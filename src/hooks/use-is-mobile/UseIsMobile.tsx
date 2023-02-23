import { useLayoutEffect, useState } from 'react';
import debounce from 'lodash-es/debounce';

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < 480);
    };

    window.addEventListener('resize', debounce(updateSize, 250));
    updateSize();

    return (): void => window.removeEventListener('resize', updateSize);
  }, []);

  return isMobile;
};

export default useIsMobile;
