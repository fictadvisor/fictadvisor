import { RegisterFormFields } from '@/components/pages/register/register-page/components/register-form/types';
export const transformData = (data: RegisterFormFields) => ({
  student: {
    groupId: data.group,
    firstName: data.firstName,
    middleName: data.middleName,
    lastName: data.lastName,
    isCaptain: data.isCaptain,
  },
  user: {
    username: data.username,
    email: data.email,
    password: data.password,
  },
});

export const transformGroups = data =>
  data.map(group => ({
    label: group.code,
    value: group.id,
  }));
