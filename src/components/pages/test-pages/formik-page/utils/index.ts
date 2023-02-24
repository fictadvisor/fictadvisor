import * as yup from 'yup';

export interface FormikPageFields {
  email: string;
  password: string;
  passwordConfirmation: string;
  id: string;
  search: string;
  group: string;
  review: string;
  isCaptain: boolean;
}

export const initialValues: FormikPageFields = {
  email: '',
  password: '',
  passwordConfirmation: '',
  id: '',
  search: '',
  group: '',
  review: '',
  isCaptain: false,
};

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
  group: yup.string().required('Group is required'),
  review: yup.string().required('Review is required'),
});
