import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  number: yup.string().required(`Обов'язкове поле`),
  date: yup.string().required(`Обов'язкове поле`),
});
