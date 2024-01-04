import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  textArea: yup.string().required('Немає кого додати!'),
});
