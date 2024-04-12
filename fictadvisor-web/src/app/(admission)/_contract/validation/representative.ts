import * as yup from 'yup';

import {
  forcePushedRegexp,
  isTheSameAsEntrant,
  personSchema,
  secretString,
} from './constants';

export const representativeValidation = yup.object().shape({
  representative: yup.object().shape({
    ...personSchema('representative'),
    email: yup.string().email('Це не схоже на поштову адресу'),
    passportNumber: yup
      .number()
      .required(`Обов'язкове поле`)
      .typeError('Тільки цифри')
      .test(isTheSameAsEntrant),
  }),
  helper: yup.object().shape({
    secretNumber: yup
      .string()
      .when(
        ['$meta.isToAdmission', 'hasCustomer'],
        ([toAdmission, hasCustomer], schema) => {
          return toAdmission && !hasCustomer
            ? schema
                .required("Обов'зкове поле")
                .matches(secretString, 'Зверніться до оператора')
            : schema.optional();
        },
      ),
  }),
});

export const representativeOptionalValidation = yup.object().shape({
  helper: yup.object().shape({
    isAdult: yup.boolean(),
    secretNumber: yup
      .string()
      .when(
        ['$meta.isToAdmission', 'hasCustomer'],
        ([toAdmission, hasCustomer], schema) => {
          return toAdmission && !hasCustomer
            ? schema
                .required("Обов'зкове поле")
                .matches(secretString, 'Зверніться до оператора')
            : schema.optional();
        },
      ),
    forcePushedNumber: yup
      .string()
      .when(
        ['$meta.isForcePushed', 'hasCustomer'],
        ([forcePushed, hasCustomer], schema) => {
          return forcePushed && !hasCustomer
            ? schema
                .required("Обов'зкове поле")
                .matches(forcePushedRegexp, 'Неправильний код')
            : schema.optional();
        },
      ),
  }),
});
