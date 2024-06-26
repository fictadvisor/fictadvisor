import { PaymentTypeParam } from '@fictadvisor/utils/enums';
import * as yup from 'yup';

import { StudyDegree } from '@/types/contract';

export const metaValidationSchema = yup.object().shape({
  meta: yup.object().shape({
    degree: yup.string().required(`Обов'язкове поле`),
    programType: yup.string().when('degree', {
      is: StudyDegree.MASTER,
      then: schema => schema.required(`Обов'язкове поле`),
      otherwise: schema => schema.optional(),
    }),
    educationalProgram: yup.string().when('degree', {
      is: StudyDegree.MASTER,
      then: schema => schema.required(`Обов'язкове поле`),
      otherwise: schema => schema.optional(),
    }),

    speciality: yup.string().when('degree', {
      is: StudyDegree.MASTER,
      then: schema => schema.optional(),
      otherwise: schema => schema.required(`Обов'язкове поле`),
    }),
    studyType: yup.string().required(`Обов'язкове поле`),
    studyForm: yup.string().required(`Обов'язкове поле`),
    paymentType: yup.string().when('studyType', {
      is: 'Контракт',
      then: schema => schema.required(`Обов'язкове поле`),
      otherwise: schema => schema.optional(),
    }),
    isToAdmission: yup.string().when('paymentType', {
      is: PaymentTypeParam.EVERY_MONTH,
      then: schema =>
        schema
          .required(`Обов'язкове поле`)
          .oneOf(
            ['true'],
            'При виборі оплати щомісяця договір повинен подаватися у корпусі',
          ),
      otherwise: schema => schema.optional(),
    }),
  }),
});

export const masterMetaValidationSchema = yup.object().shape({
  meta: yup.object().shape({
    degree: yup.string().required(`Обов'язкове поле`),
    programType: yup.string().required(`Обов'язкове поле`),
    educationalProgram: yup.string().required(`Обов'язкове поле`),

    speciality: yup.string().optional(),
    studyType: yup.string().required(`Обов'язкове поле`),
    studyForm: yup.string().required(`Обов'язкове поле`),
    paymentType: yup.string().when('studyType', {
      is: 'Контракт',
      then: schema => schema.required(`Обов'язкове поле`),
      otherwise: schema => schema.optional(),
    }),
    isToAdmission: yup.string().when('paymentType', {
      is: PaymentTypeParam.EVERY_MONTH,
      then: schema =>
        schema
          .required(`Обов'язкове поле`)
          .oneOf(
            ['true'],
            'При виборі оплати щомісяця договір повинен подаватися у корпусі',
          ),
      otherwise: schema => schema.optional(),
    }),
  }),
});
