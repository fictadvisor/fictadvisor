import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  emailAddress: yup
    .string()
    .matches(/.+@.+\..+/g, 'Це не схоже на поштову адресу')
    .required('Це не схоже на поштову адресу'),
});
