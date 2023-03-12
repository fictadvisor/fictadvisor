import { RegisterFormFields } from '@/components/pages/register/register-page/components/register-form/types';

export const transformData = (data: RegisterFormFields) => {
  const transformedData = {
    student: {
      groupId: data.group,
      firstName: data.firstName.trim(),
      middleName: data.middleName?.trim(),
      lastName: data.lastName.trim(),
      isCaptain: data.isCaptain,
    },
    user: {
      username: data.username,
      email: data.email,
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
