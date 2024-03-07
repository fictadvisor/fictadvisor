'use client';
import type { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
} from '@/components/common/ui/button-mui/types';

import * as styles from './HeaderCreate.styles';

interface HeaderCreateProps {
  handleEditSubmit: () => void;
}

const HeaderCreate: FC<HeaderCreateProps> = ({ handleEditSubmit }) => {
  const router = useRouter();

  return (
    <Box sx={styles.header}>
      <Typography sx={styles.editName} variant="h5">
        Створення викладача
      </Typography>
      <Stack flexDirection="row" gap="8px">
        <Button
          sx={styles.button}
          size={ButtonSize.MEDIUM}
          color={ButtonColor.SECONDARY}
          text="Скасувати"
          onClick={() => router.push('/admin/teachers')}
        />
        <Button
          type="submit"
          sx={styles.button}
          size={ButtonSize.MEDIUM}
          text="Зберегти"
          onClick={handleEditSubmit}
        />
      </Stack>
    </Box>
  );
};

export default HeaderCreate;
