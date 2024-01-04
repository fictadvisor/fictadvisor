import * as yup from 'yup';

import { forcePushedRegexp, personSchema, secretString } from './constants';
export const entrantOptionalValidationSchema = yup.object().shape({
  meta: yup.object().shape({
    isForcePushed: yup.boolean(),
  }),
  helper: yup.object().shape({
    isAdult: yup.boolean(),
    secretNumber: yup
      .string()
      .when(
        ['$meta.isToAdmission', '$helper.isAdult', '$helper.hasCustomer'],
        ([toAdmission, adult, hasCustomer], schema) => {
          return toAdmission && adult && !hasCustomer
            ? schema.required("Обов'язкове поле").matches(secretString)
            : schema.optional();
        },
      ),
    forcePushedNumber: yup
      .string()
      .when(
        ['$meta.isToAdmission', '$helper.isAdult', '$helper.hasCustomer'],
        ([toAdmission, adult, hasCustomer], schema) => {
          return toAdmission && adult && !hasCustomer
            ? schema.required("Обов'язкове поле").matches(forcePushedRegexp)
            : schema.optional();
        },
      ),
  }),
});

export const entrantValidationSchema = yup.object().shape({
  entrant: yup.object().shape({
    ...personSchema('entrant'),
    email: yup
      .string()
      .required(`Обов'язкове поле`)
      .email('Це не схоже на поштову адресу'),
  }),
  helper: yup.object().shape({
    secretNumber: yup
      .string()
      .when(
        ['$meta.isToAdmission', '$helper.isAdult', '$helper.hasCustomer'],
        ([toAdmission, adult, customer], schema) => {
          return toAdmission && adult && !customer
            ? schema
                .required("Обов'зкове поле")
                .matches(secretString, 'Зверніться до оператора')
            : schema.optional();
        },
      ),
  }),
});
