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
  handleCreateSubmit: () => void;
}

const HeaderCreate: FC<HeaderCreateProps> = ({ handleCreateSubmit }) => {
  const router = useRouter();

  return (
    <Box sx={styles.header}>
      <Typography sx={styles.editName} variant="h5">
        Створення групи
      </Typography>
      <Stack flexDirection="row" gap="8px">
        <Button
          sx={styles.button}
          size={ButtonSize.MEDIUM}
          color={ButtonColor.SECONDARY}
          text="Скасувати"
          onClick={() => router.push('admin/groups')}
        />
        <Button
          type="submit"
          sx={styles.button}
          size={ButtonSize.MEDIUM}
          text="Зберегти"
          onClick={handleCreateSubmit}
        />
      </Stack>
    </Box>
  );
};

export default HeaderCreate;
