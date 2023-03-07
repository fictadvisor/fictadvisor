import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  group: yup.string().required(`Обов'язкове поле`),
});
