const errors = {
  InvalidBodyException: 'Дані вказані невірно',
  DataNotFoundException: 'Дані не знайдено',
  AlreadyExistException: 'Контракт вже існує',
  UnauthorizedException: 'Користувач не авторизований',
  NoPermissionException: 'У вас немає дозволу на виконання цієї дії',
};

export const checkError = (requestError: string) => {
  for (const [exception, error] of Object.entries(errors)) {
    if (requestError === exception) {
      return error;
    }
  }
};
