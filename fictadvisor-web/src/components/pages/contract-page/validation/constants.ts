import * as yup from 'yup';
import { TestConfig } from 'yup';

import { kyiv } from '@/components/pages/contract-page/constants';
import {
  ExtendedContractBody,
  PassportType,
} from '@/lib/api/contract/types/ContractBody';
export const secretString = /^4261$/;
export const forcePushedRegexp = /^3259$/;

export const personSchema = (entity: string) => ({
  lastName: yup
    .string()
    .required(`Обов'язкове поле`)
    .min(2, 'Не коротше 2 символів')
    .max(40, 'Не довше 40 символів')
    .matches(
      /^[ҐЄІЇЬА-ЩЮЯґєіїьа-щюя\-`'’‘“”* ]+$/,
      'Має містити українські літери, апостроф або дефіс',
    ),
  firstName: yup
    .string()
    .required(`Обов'язкове поле`)
    .min(2, 'Не коротше 2 символів')
    .max(40, 'Не довше 40 символів')
    .matches(
      /^[ҐЄІЇЬА-ЩЮЯґєіїьа-щюя\-`'’‘“”* ]+$/,
      'Має містити українські літери, апостроф або дефіс',
    ),
  middleName: yup
    .string()
    .min(2, 'Не коротше 2 символів')
    .max(40, 'Не довше 40 символів')
    .matches(
      /^[ҐЄІЇЬА-ЩЮЯґєіїьа-щюя\-`'’‘“”* ]+$/,
      'Має містити українські літери, апостроф або дефіс',
    ),
  phoneNumber: yup
    .string()
    .required(`Обов'язкове поле`)
    .matches(/^\+\d+$/, 'Має починатися з символу "+"'),

  passportNumber: yup
    .number()
    .required(`Обов'язкове поле`)
    .typeError('Тільки цифри'),
  passportDate: yup
    .string()
    .required(`Обов'язкове поле`)
    .matches(
      /^\s*((?:3[01]|[12][0-9]|0[1-9])\.(1[012]|0[1-9])\.((?:19|20)\d{2}))\s*$/,
      'Має бути формату dd.mm.yyyy',
    ),
  passportInstitute: yup.string().required(`Обов'язкове поле`),
  idCode: yup
    .string()
    .optional()
    .max(10, 'Лише 10 цифр')
    .matches(/(\d{10})/, 'Лише 10 цифр'),
  region: yup.string().required(`Обов'язкове поле`),
  settlement: yup.string().when('region', {
    is: kyiv,
    then: schema => schema.optional(),
    otherwise: schema =>
      schema
        .required(`Обов'язкове поле`)
        .matches(
          /^[ҐЄІЇЬА-ЩЮЯґєіїьа-щюя0-9\-`'’‘“”*,. ]+$/,
          'Має містити українські літери, апостроф або дефіс',
        ),
  }),
  address: yup
    .string()
    .required(`Обов'язкове поле`)
    .matches(
      /^[ҐЄІЇЬА-ЩЮЯґєіїьа-щюя0-9\-`'’‘“”*,. /]+$/,
      'Має містити українські літери, апостроф або дефіс',
    ),
  index: yup
    .string()
    .required(`Обов'язкове поле`)
    .max(5, 'Лише 5 цифр')
    .matches(/(\d{5})/, 'Лише 5 цифр'),
  passportSeries: yup
    .string()
    .when([`$helper.${entity}PassportType`], ([type], schema) => {
      if (type === PassportType.FOREIGN)
        return schema
          .required("Обов'язкове поле")
          .matches(/^[A-Z]{2}$/, '2 латиничні літери верхнього регістру');
      if (type === PassportType.OLD)
        return schema
          .required("Обов'язкове поле")
          .matches(/^[А-Я]{2}$/, '2 кириличні літери верхнього регістру');
      return schema.optional();
    }),
});

export const isTheSameAsEntrant: TestConfig = {
  name: 'isTheSameAsEntrant',
  test: (value, context) => {
    const curKey = context.path
      .split('.')
      .at(-1) as keyof ExtendedContractBody['representative'];

    const valueInEntrant = (context.options.context as ExtendedContractBody)
      ?.entrant[curKey] as string;

    return value !== +valueInEntrant;
  },
  message: 'Це частина форми не стосується вступника, читайте уважніше',
};
