import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { Box } from '@mui/material';

import { Input, InputSize, InputType } from '@/components/common/ui/form';
import { FieldSize } from '@/components/common/ui/form/common/types';
import FormikDropdown from '@/components/common/ui/form/with-formik/dropdown/FormikDropdown';
import GroupAPI from '@/lib/api/group/GroupAPI';

import { StudentRoleOptions } from '../../../common/constants/StudentRoleOptions';
import { transformGroupsDefault } from '../../../common/utils/transformToOptions';

import * as styles from './EditStudentInputs.styles';

const EditStudentInputs: FC = () => {
  const { data: dataGroups } = useQuery('groups', () => GroupAPI.getAll(), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const groupsOptions = transformGroupsDefault(dataGroups?.groups || []);

  return (
    <Box sx={styles.inputsWrapper}>
      <Input
        name="firstName"
        size={InputSize.MEDIUM}
        type={InputType.DEFAULT}
        label="Ім’я"
        placeholder="Ім’я"
      />
      <Input
        name="lastName"
        size={InputSize.MEDIUM}
        type={InputType.DEFAULT}
        label="Прізвище"
        placeholder="Прізвище"
      />
      <Input
        name="middleName"
        size={InputSize.MEDIUM}
        type={InputType.DEFAULT}
        label="По-батькові"
        placeholder="По-батькові"
      />
      <FormikDropdown
        name="groupId"
        disableClearable
        placeholder="Група"
        size={FieldSize.MEDIUM}
        options={groupsOptions}
        label="Група"
      />
      <FormikDropdown
        name="roleName"
        disableClearable
        placeholder="Роль"
        size={FieldSize.MEDIUM}
        options={StudentRoleOptions}
        label="Роль"
        showRemark={false}
      />
    </Box>
  );
};
export default EditStudentInputs;
