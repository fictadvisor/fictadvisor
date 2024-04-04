import * as yup from 'yup';

import { UserGroupRole } from '@/types/user';

export const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required(`Обов'язкове поле`)
    .min(2, 'Мінімум 2 символи')
    .max(40, 'Максимум 40 символів')
    .matches(
      /^[ҐЄІЇЬА-ЩЮЯґєіїьа-щюя\-`'’‘“”* ]+$/,
      'Має містити українські літери, апостроф або дефіс',
    ),
  middleName: yup
    .string()
    .required(`Обов'язкове поле`)
    .max(40, 'Максимум 40 символів')
    .matches(
      /^[ҐЄІЇЬА-ЩЮЯґєіїьа-щюя\-`'’‘“”* ]+$/,
      'Має містити українські літери, апостроф або дефіс',
    ),
  username: yup
    .string()
    .required(`Обов'язкове поле`)
    .min(2, 'Мінімум 2 символи')
    .matches(/^[a-zA-Z0-9]*$/, 'Має містити англійські символи')
    .max(40, 'Максимум 40 символів'),
  lastName: yup
    .string()
    .required(`Обов'язкове поле`)
    .min(2, 'Мінімум 2 символи')
    .max(40, 'Максимум 40 символів')
    .matches(
      /^[ҐЄІЇЬА-ЩЮЯґєіїьа-щюя\-`'’‘“”* ]+$/,
      'Має містити українські літери, апостроф або дефіс',
    ),
  roleName: yup.string().required(`Обов'язкове поле`),
  groupId: yup.string().required(`Обов'язкове поле`),
});

export const initialValues = {
  firstName: '',
  middleName: '',
  username: '',
  lastName: '',
  roleName: '' as UserGroupRole,
  groupId: '',
};
