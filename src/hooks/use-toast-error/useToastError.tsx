import { AxiosError } from 'axios';

import useToast from '@/hooks/use-toast';
import getErrorMessage from '@/lib/utils/getErrorMessage';

type ErrorFromBackend = {
  error: string;
  messages: string[];
  status: number;
  timestamp: string;
};

const ErrorMapper: Record<string, string> = {
  NoPermissionException: 'У вас не вистачає прав на таку дію',
  UnauthorizedException: 'Ви не авторизовані, авторизуйтесь',
  InvalidBodyException: 'Неправильно заповнені дані',
  ObjectIsRequiredException: 'Неправильний тип дицсипліни чи дата початку',
};

export const useToastError = () => {
  const toast = useToast();

  const displayError = (_e: unknown) => {
    const errorMessage = getErrorMessage(_e);
    toast.error('Трапилась помилка', `${errorMessage}`, 4000);
  };

  return { displayError };
};
