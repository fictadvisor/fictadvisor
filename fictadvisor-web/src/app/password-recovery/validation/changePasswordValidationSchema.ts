import * as yup from 'yup';

import { passwordSchema } from '@/lib/validation/schemas';

export const changePasswordValidationSchema = yup.object().shape({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
  confirmationPassword: passwordSchema
    .nullable()
    .oneOf([yup.ref('newPassword'), null], 'Паролі не збігаються'),
});
