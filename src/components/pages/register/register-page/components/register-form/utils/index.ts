import { RegisterFormFields } from '@/components/pages/register/register-page/components/register-form/types';

export const transformData = (data: RegisterFormFields) => {
  const transformedData = {
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
  };
  if (!data.middleName) delete transformedData.student.middleName;

  return transformedData;
};

export const transformGroups = data =>
  data.map(group => ({
    label: group.code,
    value: group.id,
  }));
