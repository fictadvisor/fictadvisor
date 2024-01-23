import * as yup from 'yup';

const regEx = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;

export const changePasswordValidationSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required(`Обов'язкове поле`)
    .min(6, 'Не коротше 6 символів')
    .max(32, 'Не довше 32 символів')
    .matches(regEx, 'Мінімум одна латинська літера та одна цифра'),

  newPassword: yup
    .string()
    .required(`Обов'язкове поле`)
    .min(6, 'Не коротше 6 символів')
    .max(32, 'Не довше 32 символів')
    .matches(regEx, 'Мінімум одна латинська літера та одна цифра'),

  confirmationPassword: yup
    .string()
    .required(`Обов'язкове поле`)
    .min(6, 'Не коротше 6 символів')
    .max(32, 'Не довше 32 символів')
    .matches(regEx, 'Мінімум одна латинська літера та одна цифра')
    .nullable()
    .oneOf([yup.ref('newPassword'), null], 'Паролі не збігаються'),
});