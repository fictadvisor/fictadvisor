import * as yup from 'yup';
const commonValidation = yup
  .string()
  .min(2, 'Не коротше 2 символів')
  .max(40, 'Не довше 40 символів')
  .matches(
    /^[ҐЄІЇЬА-ЩЮЯґєіїьа-щюя\-`ʼ' ]+$/,
    'Має містити українські літери, апостроф або дефіс',
  );

export const validationSchema = yup.object().shape({
  firstName: commonValidation.required(`Обов'язкове поле`),
  lastName: commonValidation.required(`Обов'язкове поле`),
  middleName: commonValidation,
});
