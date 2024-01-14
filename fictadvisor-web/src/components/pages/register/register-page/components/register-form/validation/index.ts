import * as yup from 'yup';

import { passwordValidationSchema } from '@/lib/validation/passwordValidationSchema';

export const validationSchema = passwordValidationSchema.shape({
  username: yup
    .string()
    .required(`Обов'язкове поле`)
    .min(2, 'Не коротше 2 символів')
    .max(40, 'Не довше 40 символів')
    .matches(/^\w+$/, 'Має містити латинські літери, цифри або знак _'),
  firstName: yup
    .string()
    .required(`Обов'язкове поле`)
    .min(2, 'Не коротше 2 символів')
    .max(40, 'Не довше 40 символів')
    .matches(
      /^[ҐЄІЇЬА-ЩЮЯґєіїьа-щюя\-`ʼ' ]+$/,
      'Має містити українські літери, апостроф або дефіс',
    ),
  lastName: yup
    .string()
    .required(`Обов'язкове поле`)
    .min(2, 'Не коротше 2 символів')
    .max(40, 'Не довше 40 символів')
    .matches(
      /^[ҐЄІЇЬА-ЩЮЯґєіїьа-щюя\-`ʼ' ]+$/,
      'Має містити українські літери, апостроф або дефіс',
    ),
  middleName: yup
    .string()
    .min(2, 'Не коротше 2 символів')
    .max(40, 'Не довше 40 символів')
    .matches(
      /^[ҐЄІЇЬА-ЩЮЯґєіїьа-щюя\-`ʼ' ]+$/,
      'Має містити українські літери, апостроф або дефіс',
    ),
  email: yup
    .string()
    .required(`Обов'язкове поле`)
    .email('Це не схоже на поштову адресу'),
  group: yup.string().required(`Обов'язкове поле`),
  agreement: yup.boolean().isTrue(''),
});
