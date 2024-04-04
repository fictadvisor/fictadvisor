import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';

import { Input, InputSize } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown/FormikDropdown';
import { useQueryAdminOptions } from '@/components/pages/admin/common/constants';
import GroupAPI from '@/lib/api/group/GroupAPI';

import { StudentRoleOptions } from '../../../common/constants';
import { transformGroupsDefault } from '../../../common/utils/transformToOptions';

import * as styles from './CreateStudentInputs.styles';

const CreateStudentInputs: FC = () => {
  const { data: dataGroups } = useQuery(
    ['groups'],
    () => GroupAPI.getAll(),
    useQueryAdminOptions,
  );

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
