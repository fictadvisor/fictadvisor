'use client';
import { type FC, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import DeletePopup from '@/components/common/ui/delete-popup';
import { Group } from '@/types/group';

import * as styles from './HeaderEdit.styles';

interface HeaderEditProps {
  group: Group;
  handleEditSubmit: () => void;
  handleDeleteSubmit: () => void;
}

const HeaderEdit: FC<HeaderEditProps> = ({
  group,
  handleEditSubmit,
  handleDeleteSubmit,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box sx={styles.header}>
      <Box sx={styles.editName}>
        <Typography variant="h5">Редагування</Typography>
        <Typography sx={styles.name}>Група {group.code}</Typography>
      </Box>
      <Stack flexDirection="row" gap="8px">
        <Button
          sx={styles.button}
          size={ButtonSize.MEDIUM}
          color={ButtonColor.SECONDARY}
          text="Скасувати"
          onClick={() => router.push('admin/groups')}
        />
        <Button
          sx={styles.button}
          size={ButtonSize.MEDIUM}
          variant={ButtonVariant.OUTLINE}
          color={ButtonColor.SECONDARY}
          startIcon={<TrashIcon />}
          text="Видалити"
          onClick={() => setIsOpen(true)}
        />
        {isOpen && (
          <DeletePopup
            setPopupOpen={setIsOpen}
            handleDeleteSubmit={handleDeleteSubmit}
            name={`групу ${group.code}`}
          />
        )}
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
