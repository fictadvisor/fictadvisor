import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .optional()
    .min(5, 'Full Name should be at least 5 characters')
    .max(50, 'Full Name should be at most 50 characters'),
  groupId: yup.string().optional(),
  title: yup
    .string()
    .required('Title is required')
    .min(5, 'Title should be at least 5 characters')
    .max(100, 'Title should be at most 100 characters'),
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message should be at least 10 characters')
    .max(3500, 'Message should be at most 3500 characters'),
});

export const initialValues = {
  fullName: '',
  groupId: '',
  title: '',
  message: '',
};
