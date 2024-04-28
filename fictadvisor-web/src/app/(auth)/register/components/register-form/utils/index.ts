import { RegistrationDTO } from '@fictadvisor/utils/requests';
import { MappedGroupResponse } from '@fictadvisor/utils/responses';

import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

import { RegisterFormFields } from '../types';

export const transformData = (data: RegisterFormFields): RegistrationDTO => {
  const transformedData: RegistrationDTO = {
    student: {
      groupId: data.group.trim(),
      // TODO: refactor this
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

  return transformedData;
};

export const transformGroups = (
  data: MappedGroupResponse[],
): DropDownOption[] =>
  data.map(({ code, id }) => ({
    label: code,
    id,
  }));
