import * as yup from 'yup';
import { TestConfig } from 'yup';

const secretString = /^4261$/;
const forcePushedRegexp = /^3259$/;

const priorityFieldTestOptions: TestConfig = {
  name: 'uniqueOption',
  test: (value, context) => {
    const curKey = context.path.split('.').at(-1);
    const otherOptions = Object.entries(context.parent).filter(
      option => option[0] !== curKey,
    );
    return otherOptions.every(option => option[1] !== value);
  },
  message: 'Кожен пріоритет повинен бути унікальним',
};

export const optionalValidationSchema = yup.object().shape({
  isForcePushed: yup.boolean(),
  forcePushedNumber: yup.string().when('isForcePushed', {
    is: true,
    then: schema =>
      schema
        .required("Обов'язкове поле")
        .matches(forcePushedRegexp, 'Неправильний код'),
    otherwise: schema => schema.optional(),
  }),
  secretNumber: yup
    .string()
    .when('isToAdmission', ([isToAdmission], schema) => {
      return isToAdmission
        ? schema
            .matches(secretString, 'Неправильний код')
            .required('Зверніться до оператора')
        : schema.optional();
    }),
});
export const validationSchema = yup.object().shape({
  noMiddleName: yup.boolean(),
  lastName: yup
    .string()
    .required(`Обов'язкове поле`)
    .min(2, 'Не коротше 2 символів')
    .max(40, 'Не довше 40 символів')
    .matches(
      /^[ҐЄІЇЬА-ЩЮЯґєіїьа-щюя\-`ʼ' ]+$/,
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
    )
    .when('noMiddleName', {
      is: true,
      then: schema => schema.optional(),
      otherwise: schema => schema.required("Обов'зкове поле"),
    }),
  specialty: yup.string().required("Обов'зкове поле"),
  email: yup
    .string()
    .email('Це не схоже на поштову адресу')
    .required(`Обов'язкове поле`),
  day: yup
    .string()
    .required(`Обов'язкове поле`)
    .matches(
      /(0[1-9]|[12]\d|3[01])/,
      'Має бути номер дня, одиничний починається з 0',
    )
    .min(2, '2 цифри')
    .max(2, '2 цифри'),
  priorities: yup.object().shape({
    1: yup.string().required(`Обов'язкове поле`).test(priorityFieldTestOptions),
    2: yup.string().required(`Обов'язкове поле`).test(priorityFieldTestOptions),
    3: yup
      .string()
      .test({
        message: "Обов'язкове поле",
        test: (value, context) => {
          const speciality = context.options.context?.specialty;
          if (speciality === '126') return !!value;
          return true;
        },
      })
      .test(priorityFieldTestOptions),
  }),
  secretNumber: yup
    .string()
    .when('isToAdmission', ([isToAdmission], schema) => {
      return isToAdmission
        ? schema
            .matches(secretString, 'Неправильний код')
            .required('Зверніться до оператора')
        : schema.optional();
    }),
  isForcePushed: yup.boolean(),
});
