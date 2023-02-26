import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  username: yup.string().required(`Обов'язкове поле`),
  password: yup.string().required(`Обов'язкове поле`),
});
