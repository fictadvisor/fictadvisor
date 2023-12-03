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
    .min(8, 'Не коротше 8 символів')
    .max(32, 'Не довше 32 символів')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[\w\W]+$/,
      'Мінімум одна велика латинська літера, одна цифра та один спеціальний символ',
    ),
  confirmationPassword: yup
    .string()
    .nullable()
    .oneOf([yup.ref('newPassword'), null], 'Паролі не збігаються')
    .required(`Обов'язкове поле`),
});
