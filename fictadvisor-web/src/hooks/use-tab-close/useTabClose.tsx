import { DependencyList, useEffect } from 'react';

const useTabClose = (cb: () => void, deps: DependencyList = []) => {
  useEffect(() => {
    const handleTabClose = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      cb();
    };
    window.addEventListener('beforeunload', handleTabClose);
    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, deps);
};

export default useTabClose;
