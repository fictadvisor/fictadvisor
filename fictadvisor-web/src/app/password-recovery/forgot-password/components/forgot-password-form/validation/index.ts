import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Це не схоже на поштову адресу')
    .required('Це не схоже на поштову адресу'),
});
