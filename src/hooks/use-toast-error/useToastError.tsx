import { AxiosError } from 'axios';

import useToast from '@/hooks/use-toast';

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
    const error = _e as AxiosError<ErrorFromBackend>;
    const data = error?.response?.data as ErrorFromBackend;

    const errorMessage = ErrorMapper[data?.error]
      ? ErrorMapper[data?.error]
      : error.message;

    toast.error('Трапилась помилка', `${errorMessage}`, 4000);
  };

  return { displayError };
};
