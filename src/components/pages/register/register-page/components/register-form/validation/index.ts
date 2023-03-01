import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  username: yup.string().required(`Обов'язкове поле`),
  firstName: yup.string().required(`Обов'язкове поле`),
  lastName: yup.string().required(`Обов'язкове поле`),
  email: yup.string().required(`Обов'язкове поле`),
  group: yup.string().required(`Обов'язкове поле`),
  password: yup.string().required(`Обов'язкове поле`),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .required('Confirm password is required'),
  agreement: yup.boolean().isTrue('You gotta agree, man'),
});
