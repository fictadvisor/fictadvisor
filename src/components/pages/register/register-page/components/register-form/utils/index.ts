import { RegisterFormFields } from '@/components/pages/register/register-page/components/register-form/types';
import { Group } from '@/redux/reducers/group-reducer/group.types';

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

export const transformGroups = (data: Group[]) =>
  data.map(group => ({
    label: group.code,
    value: group.id,
  }));
