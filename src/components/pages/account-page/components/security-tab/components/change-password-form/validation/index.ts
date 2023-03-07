import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required(`Обов'язкове поле`)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[\w\W]+$/,
      'Мінімум одна літера та одна цифра',
    ),
  newPassword: yup
    .string()
    .required(`Обов'язкове поле`)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[\w\W]+$/,
      'Мінімум одна літера та одна цифра',
    ),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Паролі не збігаються')
    .required(`Обов'язкове поле`),
});
