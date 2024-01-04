import * as yup from 'yup';

import {
  forcePushedRegexp,
  isTheSameAsEntrant,
  personSchema,
  secretString,
} from '@/components/pages/contract-page/validation/constants';

export const customerValidation = yup.object().shape({
  customer: yup.object().shape({
    ...personSchema('customer'),
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
      .when(['$meta.isToAdmission'], ([toAdmission], schema) => {
        return toAdmission
          ? schema
              .required("Обов'зкове поле")
              .matches(secretString, 'Зверніться до оператора')
          : schema.optional();
      }),
  }),
});

export const customerOptionalValidation = yup.object().shape({
  helper: yup.object().shape({
    isAdult: yup.boolean(),
    secretNumber: yup
      .string()
      .when(['$meta.isToAdmission'], ([toAdmission], schema) => {
        return toAdmission
          ? schema
              .required("Обов'зкове поле")
              .matches(secretString, 'Зверніться до оператора')
          : schema.optional();
      }),
    forcePushedNumber: yup
      .string()
      .when(['$meta.isForcePushed'], ([forcePushed], schema) => {
        return forcePushed
          ? schema
              .required("Обов'зкове поле")
              .matches(forcePushedRegexp, 'Неправильний код')
          : schema.optional();
      }),
  }),
});
