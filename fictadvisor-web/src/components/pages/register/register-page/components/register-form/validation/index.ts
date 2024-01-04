import * as yup from 'yup';

export const validationSchema = yup.object().shape({
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
  password: yup
    .string()
    .required(`Обов'язкове поле`)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[\w\W]+$/,
      'Мінімум одна латинська літера та одна цифра',
    ),
  passwordConfirmation: yup
    .string()
    .nullable()
    .oneOf([yup.ref('password'), null], 'Паролі не збігаються')
    .required(`Обов'язкове поле`),
  agreement: yup.boolean().isTrue(''),
});
