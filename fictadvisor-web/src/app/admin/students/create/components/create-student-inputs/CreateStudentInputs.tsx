import React, { FC } from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { useQueryAdminOptions } from '@/app/admin/common/constants';
import { StudentRoleOptions } from '@/app/admin/students/common/constants';
import { transformGroupsDefault } from '@/app/admin/students/common/utils/transformToOptions';
import { Input, InputSize } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown/FormikDropdown';
import GroupAPI from '@/lib/api/group/GroupAPI';

import * as styles from './CreateStudentInputs.styles';

const CreateStudentInputs: FC = () => {
  const { data: dataGroups } = useQuery({
    queryKey: ['groups'],
    queryFn: () => GroupAPI.getAll(),
    ...useQueryAdminOptions,
  });

  const groupsOptions = transformGroupsDefault(dataGroups?.groups || []);

  return (
    <Box sx={styles.inputsWrapper}>
      <Input
        name="firstName"
        size={InputSize.MEDIUM}
        label="Ім’я"
        placeholder="Ім’я"
      />
      <Input
        name="lastName"
        size={InputSize.MEDIUM}
        label="Прізвище"
        placeholder="Прізвище"
      />
      <Input
        name="middleName"
        size={InputSize.MEDIUM}
        label="По-батькові"
        placeholder="По-батькові"
      />
      <Input
        name="username"
        size={InputSize.MEDIUM}
        label="Username"
        placeholder="Username"
      />
      <FormikDropdown
        name="groupId"
        disableClearable
        placeholder="Група"
        size={FieldSize.LARGE}
        options={groupsOptions}
        label=""
      />
      <FormikDropdown
        name="roleName"
        disableClearable
        placeholder="Роль"
        size={FieldSize.LARGE}
        options={StudentRoleOptions}
        label=""
      />
    </Box>
  );
};
export default CreateStudentInputs;
