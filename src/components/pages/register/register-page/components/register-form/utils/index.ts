import { RegisterFormFields } from '@/components/pages/register/register-page/components/register-form/types';

export const transformData = (data: RegisterFormFields) => {
  const transformedData = {
    student: {
      groupId: data.group.trim(),
      firstName: data.firstName.trim().replace('`', `'`).replace('ʼ', `'`),
      middleName: data.middleName?.trim().replace('`', `'`).replace('ʼ', `'`),
      lastName: data.lastName.trim().replace('`', `'`).replace('ʼ', `'`),
      isCaptain: data.isCaptain,
    },
    user: {
      username: data.username.trim(),
      email: data.email.toLowerCase().trim(),
      password: data.password.trim(),
    },
  };
  if (!data.middleName) delete transformedData.student.middleName;

  return transformedData;
};

export const transformGroups = data =>
  data.map(group => ({
    label: group.code,
    value: group.id,
  }));
