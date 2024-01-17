import React, { FC } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, CardHeader, Stack } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import { GroupStudent } from '@/types/student';

import * as styles from './HeaderStudentEdit.styles';

interface HeaderStudentEditProps {
  student: GroupStudent;
  handleDelete: (userId: string) => Promise<void>;
}

const HeaderStudentEdit: FC<HeaderStudentEditProps> = ({
  student,
  handleDelete,
}) => {
  return (
    <Box sx={styles.header}>
      <CardHeader
        title="Редагування"
        subheader={`${student.firstName} ${student.middleName} ${student.lastName}`}
        sx={styles.title}
      />
      <Stack flexDirection="row" gap="8px">
        <Button
          size={ButtonSize.MEDIUM}
          color={ButtonColor.SECONDARY}
          text="Скасувати"
          href="/admin/students"
          sx={styles.button}
        />
        <Button
          size={ButtonSize.MEDIUM}
          variant={ButtonVariant.OUTLINE}
          color={ButtonColor.SECONDARY}
          startIcon={<TrashIcon />}
          text="Видалити"
          onClick={() => handleDelete(student.id)}
          sx={styles.button}
        />
        <Button
          size={ButtonSize.MEDIUM}
          text="Зберегти"
          type="submit"
          sx={styles.button}
        />
      </Stack>
    </Box>
  );
};
export default HeaderStudentEdit;
