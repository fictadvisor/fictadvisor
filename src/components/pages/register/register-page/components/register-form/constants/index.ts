import { RegisterFormFields } from '@/components/pages/register/register-page/components/register-form/types';

export const initialValues: RegisterFormFields = {
  username: '',
  firstName: '',
  lastName: '',
  middleName: '',
  email: '',
  group: undefined,
  isCaptain: false,
  password: '',
  passwordConfirmation: '',
  agreement: false,
};
