import { AlertType } from '@/components/common/ui/alert-mui/types';

export interface ToastState {
  open: boolean;
  title: string;
  type: AlertType;
  description?: string;
  timer?: number;
}

export type ToastActionProps = Omit<ToastState, 'open'>;

export interface ToastContext {
  showToast: (options: ToastActionProps) => void;
}

export type ToastFunction = (
  title: string,
  description?: string,
  timer?: number,
) => void;

export type UseToastReturn = Record<AlertType, ToastFunction>;
