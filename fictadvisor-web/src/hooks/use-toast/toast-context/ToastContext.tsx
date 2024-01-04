import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';

import { AlertType } from '@/components/common/ui/alert/types';
import Toast from '@/components/common/ui/toast';

import { ToastActionProps, ToastContext, ToastState } from '../types';

export const toastContext = React.createContext<ToastContext>({
  showToast: () => {},
});

export const useToastContext = () => useContext(toastContext);

const ToastContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [options, setOptions] = useState<ToastState>({
    type: AlertType.ERROR,
    title: '',
    description: '',
    open: false,
  });

  const hideToast = useCallback(
    () => setOptions({ ...options, open: false }),
    [options],
  );

  const showToast = useCallback(
    ({
      title,
      type = AlertType.ERROR,
      description,
      timer,
    }: ToastActionProps) => {
      setOptions({
        open: true,
        type,
        title,
        description,
        timer,
      });
    },
    [],
  );

  return (
    <toastContext.Provider value={{ showToast }}>
      <Toast onClose={hideToast} {...options} />
      {children}
    </toastContext.Provider>
  );
};

export default ToastContextProvider;
