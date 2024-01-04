import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  groupId: yup.string().required(`Обов'язкове поле`),
});
