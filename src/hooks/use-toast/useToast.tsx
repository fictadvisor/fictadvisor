import { useContext } from 'react';

import { ToastContext } from '@/hooks/use-toast/toast-context';

const useToast = () => {
  const { showToast } = useContext(ToastContext);

  return {
    error: (title, description?, timer?) =>
      showToast({ title, description, type: 'error', timer }),
    warning: (title, description?, timer?) =>
      showToast({ title, description, type: 'warning', timer }),
    success: (title, description?, timer?) =>
      showToast({ title, description, type: 'success', timer }),
    info: (title, description?, timer?) =>
      showToast({ title, description, type: 'info', timer }),
  };
};

export default useToast;
