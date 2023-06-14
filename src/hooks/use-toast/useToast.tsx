import { useContext } from 'react';

import { ToastContext } from '@/hooks/use-toast/toast-context';

const useToast = () => {
  const { showToast } = useContext(ToastContext);

  return {
    error: (title, description?) =>
      showToast({ title, description, type: 'error' }),
    warning: (title, description?) =>
      showToast({ title, description, type: 'warning' }),
    success: (title, description?) =>
      showToast({ title, description, type: 'success' }),
    info: (title, description?) =>
      showToast({ title, description, type: 'info' }),
  };
};

export default useToast;
