export interface FormikPageFields {
  email: string;
  password: string;
  passwordConfirmation: string;
  id: string;
  search: string;
}

export const initialValues: FormikPageFields = {
  email: '',
  password: '',
  passwordConfirmation: '',
  id: '',
  search: '',
};

import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password should be at least 8 characters')
    .max(16, 'Password is too long'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match')
    .required('Confirm password is required'),
  id: yup.string().required('Id is required'),
});
