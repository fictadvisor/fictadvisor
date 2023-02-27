import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  createPassword: yup
    .string()
    .required(
      'Має бути не коротше 8 символів та містити спеціальні знаки ?!#$*()',
    )
    .min(
      8,
      'Має бути не коротше 8 символів та містити спеціальні знаки ?!#$*()',
    )
    .max(50, 'Пароль занадто довгий')
    .matches(
      /(?=.*[A-Za-z$-/:-?{-~!"^_[\]\d])/,
      'Має бути не коротше 8 символів та містити спеціальні знаки ?!#$*()',
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('createPassword'), null], 'Паролі не збігаються')
    .required('Це поле не може бути пустим'),
});
