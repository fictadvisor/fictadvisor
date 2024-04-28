import * as yup from 'yup';

export const createValidationSchema = () => {
  return yup.object().shape({
    textAreaValidate: yup
      .string()
      .min(4, 'Текст повинен містити не менше 4 символів')
      .max(4000, 'Текст повинен містити не більше 4000 символів'),
  });
};
