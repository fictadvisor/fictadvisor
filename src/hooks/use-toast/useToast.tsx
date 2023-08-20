import { AlertType } from '@/components/common/ui/alert/types';

import { useToastContext } from './toast-context';
import { UseToastReturn } from './types';

const useToast = (): UseToastReturn => {
  const { showToast } = useToastContext();

  return {
    error: (title, description, timer = 3000) =>
      showToast({ title, description, type: AlertType.ERROR, timer }),
    warning: (title, description, timer) =>
      showToast({ title, description, type: AlertType.WARNING, timer }),
    success: (title, description, timer) =>
      showToast({ title, description, type: AlertType.SUCCESS, timer }),
    info: (title, description, timer) =>
      showToast({ title, description, type: AlertType.INFO, timer }),
  };
};

export default useToast;
