import { RegisterFormFields } from '@/components/pages/register/register-page/components/register-form/types';

export const transformData = (data: RegisterFormFields) => {
  const transformedData = {
    student: {
      groupId: data.group,
      firstName: data.firstName.trim().replace('`', `'`).replace('ʼ', `'`),
      middleName: data.middleName?.trim().replace('`', `'`).replace('ʼ', `'`),
      lastName: data.lastName.trim().replace('`', `'`).replace('ʼ', `'`),
      isCaptain: data.isCaptain,
    },
    user: {
      username: data.username,
      email: data.email.toLowerCase(),
      password: data.password,
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
