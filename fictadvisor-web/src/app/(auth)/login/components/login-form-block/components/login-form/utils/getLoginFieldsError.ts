import getErrorMessage from '@/lib/utils/getErrorMessage';

type ErrorMapping = {
  'The password is incorrect': { password: string };
  'User with such id is not found': { username: string };
  "The email hasn't verified yet": { username: string };
};

const errorMapping: ErrorMapping = {
  'The password is incorrect': { password: 'Неправильний пароль' },
  'User with such id is not found': {
    username: 'Користувача з таким паролем та поштою не знайдено',
  },
  "The email hasn't verified yet": {
    username: 'Електронну пошту ще не підтверджено',
  },
};

const isKeyOfErrorMapping = (key: string): key is keyof ErrorMapping => {
  return key in errorMapping;
};

export const getLoginFieldsError = (error: unknown) => {
  const message = getErrorMessage(error);

  if (isKeyOfErrorMapping(message)) {
    return errorMapping[message];
  }

  return { username: message };
};
