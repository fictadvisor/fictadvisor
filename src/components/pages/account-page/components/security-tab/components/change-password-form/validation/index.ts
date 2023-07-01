import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required(`Обов'язкове поле`)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[\w\W]+$/,
      'Мінімум одна латинська літера та одна цифра',
    ),
  newPassword: yup
    .string()
    .required(`Обов'язкове поле`)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[\w\W]+$/,
      'Мінімум одна латинська літера та одна цифра',
    ),
  confirmationPassword: yup
    .string()
    .nullable()
    .oneOf([yup.ref('newPassword'), null], 'Паролі не збігаються')
    .required(`Обов'язкове поле`),
});
