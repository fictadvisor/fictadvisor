import * as yup from 'yup';

import { PaymentTypeParam } from '@/types/contract';

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
