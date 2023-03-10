import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required(`Обов'язкове поле`)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[\w\W]+$/,
      'Мінімум одна літера та одна цифра',
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('createPassword'), null], 'Паролі не збігаються')
    .required('Це поле не може бути пустим'),
});
