import React, { FC, PropsWithChildren, useState } from 'react';

import { AlertType } from '@/components/common/ui/alert-mui/Alert';
import Toast from '@/components/common/ui/toast-mui';

interface ToastContextType {
  showToast: (OptionsType) => void;
}

export const ToastContext = React.createContext<ToastContextType>({
  showToast: () => {},
});

interface OptionsType {
  open: boolean;
  title: string;
  type: AlertType;
  description?: string;
}

const ToastContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [options, setOptions] = useState<OptionsType>({
    type: 'error',
    title: '',
    description: '',
    open: false,
  });

  const hideToast = () => setOptions({ ...options, open: false });

  const showToast = ({ title, type = 'error', description }: OptionsType) => {
    setOptions({
      open: true,
      type,
      title,
      description,
    });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast onClose={hideToast} {...options} />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;
