import { RegisterFormFields } from '@/app/(auth)/register/components/register-form/types';

export const initialValues: RegisterFormFields = {
  username: '',
  firstName: '',
  lastName: '',
  middleName: '',
  email: '',
  group: '',
  isCaptain: false,
  password: '',
  passwordConfirmation: '',
  agreement: false,
};
