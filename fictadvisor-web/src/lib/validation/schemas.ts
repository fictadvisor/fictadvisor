import * as yup from 'yup';

const passwordRegEx = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;

const passwordSchema = yup
  .string()
  .required(`Обов'язкове поле`)
  .min(6, 'Не коротше 6 символів')
  .max(32, 'Не довше 32 символів')
  .matches(passwordRegEx, 'Мінімум одна латинська літера та одна цифра');

export { passwordSchema };
