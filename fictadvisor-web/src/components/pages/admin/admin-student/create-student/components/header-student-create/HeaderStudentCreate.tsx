import React, { FC } from 'react';
import { Box, CardHeader, Stack } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
} from '@/components/common/ui/button-mui/types';
import * as stylesAdmin from '@/components/pages/admin/common/styles/AdminPages.styles';

const HeaderStudentCreate: FC = () => {
  return (
    <Box sx={stylesAdmin.header}>
      <CardHeader title="Створення студента" sx={stylesAdmin.title} />
      <Stack flexDirection="row" gap="8px">
        <Button
          size={ButtonSize.MEDIUM}
          color={ButtonColor.SECONDARY}
          text="Скасувати"
          href="/admin/students"
          sx={stylesAdmin.button}
        />
        <Button
          size={ButtonSize.MEDIUM}
          text="Зберегти"
          type="submit"
          sx={stylesAdmin.button}
        />
      </Stack>
    </Box>
  );
};
export default HeaderStudentCreate;
