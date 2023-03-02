import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  createPassword: yup
    .string()
    .required('Не коротше 8 символів, мінімум одна літера та одна цифра')
    .min(8, 'Не коротше 8 символів')
    .max(50, 'Пароль занадто довгий')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[\w\W]+$/,
      'Мінімум одна літера та одна цифра',
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('createPassword'), null], 'Паролі не збігаються')
    .required('Це поле не може бути пустим'),
});
