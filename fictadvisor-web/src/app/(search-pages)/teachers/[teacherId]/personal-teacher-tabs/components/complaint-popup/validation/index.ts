import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .optional()
    .min(5, 'ПІБ занадто коротке (мінімум: 5 символів)')
    .max(50, 'ПІБ занадто довге (максимум: 50 символів)'),
  groupId: yup.string().optional(),
  title: yup
    .string()
    .required('Заголовок не може бути порожнім')
    .min(5, 'Заголовок занадто короткий (мінімум: 5 символів)')
    .max(100, 'Заголовок занадто довгий (максимум: 100 символів)'),
  message: yup
    .string()
    .required('Скарга не може бути порожньою')
    .min(10, 'Скарга занадто коротка (мінімум: 10 символів)')
    .max(3500, 'Скарга занадто довга (максимум: 3500 символів)'),
});

export const initialValues = {
  fullName: '',
  groupId: '',
  title: '',
  message: '',
};
