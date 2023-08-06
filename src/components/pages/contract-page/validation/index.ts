import * as yup from 'yup';
import { TestConfig } from 'yup';

import { kyiv } from '@/components/pages/contract-page/constants';
import { ExtendedContractBody } from '@/lib/api/contract/types/ContractBody';
const secretString = /^4261$/;
const forcePushedRegexp = /^3259$/;

const isTheSameAsEntrant: TestConfig = {
  name: 'isTheSameAsEntrant',
  test: (value, context) => {
    const curKey = context.path
      .split('.')
      .at(-1) as keyof ExtendedContractBody['representative'];

    const valueInEntrant = (context.options.context as ExtendedContractBody)
      ?.entrant[curKey] as string;

    return value !== +valueInEntrant;
  },
  message: 'Це сторінка стосується законного представника, а не вступника',
};

export const metaValidationSchema = yup.object().shape({
  meta: yup.object().shape({
    speciality: yup.string().required(`Обов'язкове поле`),
    studyType: yup.string().required(`Обов'язкове поле`),
    studyForm: yup.string().required(`Обов'язкове поле`),
    paymentType: yup.string().when('studyType', {
      is: 'Контракт',
      then: schema => schema.required(`Обов'язкове поле`),
      otherwise: schema => schema.optional(),
    }),
  }),
});
export const representativeValidation = yup.object().shape({
  meta: yup.object().shape({
    isToAdmission: yup.boolean(),
  }),
  representative: yup.object().shape({
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
      .matches(
        /^[+][(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        'Має починатися з символу "+" і коду країни ',
      ),
    email: yup.string().email('Це не схоже на поштову адресу'),
    passportSeries: yup
      .string()
      .optional()
      .test(
        'are2LatinLetters',
        'Мають бути 2 великі латиничні літери',
        (value, context) => {
          const data = (
            context.from as { schema: never; value: ExtendedContractBody }[]
          )[1].value;
          if (data.helper.representativeHasForeignPassport)
            return !!value?.match(/^[A-Z]{2}$/);
          return true;
        },
      )
      .test(
        'are2CirilicLetters',
        'Мають бути 2 великі кириличні літери',
        (value, context) => {
          const data = (
            context.from as { schema: never; value: ExtendedContractBody }[]
          )[1].value;
          if (data.helper.representativeHasOldPassport)
            return !!value?.match(/^[А-Я]{2}$/);
          return true;
        },
      ),
    passportNumber: yup
      .number()
      .required(`Обов'язкове поле`)
      .typeError('Тільки цифри')
      .test(isTheSameAsEntrant),
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
  }),
  helper: yup.object().shape({
    secretNumber: yup
      .string()
      .test(
        'validSecretNumber',
        'Зверніться до оператора',
        function (value, context) {
          const data = (
            context.from as { schema: never; value: ExtendedContractBody }[]
          )[1].value;

          if (data.meta.isToAdmission) return !!value?.match(secretString);

          return true;
        },
      ),
  }),
});

export const representativeOptionalValidation = yup.object().shape({
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

          if (data.meta.isToAdmission) return !!value?.match(secretString);

          return true;
        },
      ),
    forcePushedNumber: yup
      .string()
      .required("Обов'язкове поле")
      .matches(forcePushedRegexp, 'Неправильний код'),
  }),
});

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
  meta: yup.object().shape({
    isToAdmission: yup.boolean(),
  }),
  entrant: yup.object().shape({
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
      .matches(
        /^[+][(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
        'Має починатися з символу "+" і коду країни ',
      ),
    email: yup
      .string()
      .required(`Обов'язкове поле`)
      .email('Це не схоже на поштову адресу'),
    passportSeries: yup
      .string()
      .optional()
      .test(
        'are2LatinLetters',
        'Мають бути 2 великі латиничні літери',
        (value, context) => {
          const data = (
            context.from as { schema: never; value: ExtendedContractBody }[]
          )[1].value;
          if (data.helper.entrantHasForeignPassport)
            return !!value?.match(/^[A-Z]{2}$/);
          return true;
        },
      )
      .test(
        'are2CirilicLetters',
        'Мають бути 2 великі кириличні літери',
        (value, context) => {
          const data = (
            context.from as { schema: never; value: ExtendedContractBody }[]
          )[1].value;
          if (data.helper.entrantHasOldPassport)
            return !!value?.match(/^[А-Я]{2}$/);
          return true;
        },
      ),

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
  }),
});
