import * as yup from 'yup';

import { ExtendedContractBody } from '@/lib/api/contract/types/ContractBody';

import { forcePushedRegexp, personSchema, secretString } from './constants';
export const entrantOptionalValidationSchema = yup.object().shape({
  meta: yup.object().shape({
    isForcePushed: yup.boolean(),
  }),
  helper: yup.object().shape({
    isAdult: yup.boolean(),
    secretNumber: yup
      .string()
      .test(
        'validSecretNumber',
        'Зверніться до оператора',
        function (value, context) {
          const data = (
            context.from as { schema: never; value: ExtendedContractBody }[]
          )[1].value;

          if (context.parent.isAdult && data.meta.isToAdmission)
            return !!value?.match(secretString);

          return true;
        },
      ),
    forcePushedNumber: yup
      .string()
      .optional()
      .test(
        'validForcePushedNumber',
        'Неправильний код',
        function (value, context) {
          const data = (
            context.from as { schema: never; value: ExtendedContractBody }[]
          )[1].value;

          if (data.meta?.isForcePushed && data.helper.isAdult)
            return !!value?.match(forcePushedRegexp);

          return true;
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
