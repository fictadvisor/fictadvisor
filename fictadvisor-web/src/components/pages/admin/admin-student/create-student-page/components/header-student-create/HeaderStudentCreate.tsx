import React, { FC } from 'react';
import { Box, CardHeader, Stack } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
} from '@/components/common/ui/button-mui/types';

import * as styles from './HeaderStudentCreate.styles';

const HeaderStudentCreate: FC = () => {
  return (
    <Box sx={styles.header}>
      <CardHeader title="Створення студента" sx={styles.title} />
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
          text="Зберегти"
          type="submit"
          sx={styles.button}
        />
      </Stack>
    </Box>
  );
};
export default HeaderStudentCreate;
