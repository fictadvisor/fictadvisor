'use client';
import type { FC } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import { Teacher } from '@/types/teacher';

import * as styles from './HeaderEdit.styles';

interface HeaderEditProps {
  teacher: Teacher;
  handleEditSubmit: () => void;
  handleDeleteSubmit: () => void;
}

const HeaderEdit: FC<HeaderEditProps> = ({
  teacher,
  handleEditSubmit,
  handleDeleteSubmit,
}) => {
  const router = useRouter();

  return (
    <Box sx={styles.header}>
      <Box sx={styles.editName}>
        <Typography variant="h5">Редагування</Typography>
        <Typography sx={styles.name}>
          {teacher?.lastName} {teacher?.firstName} {teacher?.middleName}
        </Typography>
      </Box>
      <Stack flexDirection="row" gap="8px">
        <Button
          sx={styles.button}
          size={ButtonSize.MEDIUM}
          color={ButtonColor.SECONDARY}
          text="Скасувати"
          onClick={() => router.push('/admin/teachers')}
        />
        <Button
          sx={styles.button}
          size={ButtonSize.MEDIUM}
          variant={ButtonVariant.OUTLINE}
          color={ButtonColor.SECONDARY}
          startIcon={<TrashIcon />}
          text="Видалити"
          onClick={handleDeleteSubmit}
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

export default HeaderEdit;
