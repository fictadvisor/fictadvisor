import React, { Dispatch, FC, SetStateAction } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Popup from '@/components/common/ui/pop-ups/Popup';

import * as styles from './DeletePopup.styles';

interface DeletePopupProps {
  setPopupOpen: Dispatch<SetStateAction<boolean>>;
  handleDeleteSubmit: () => void;
  name: string;
}

const DeletePopup: FC<DeletePopupProps> = ({
  setPopupOpen,
  handleDeleteSubmit,
  name,
}) => {
  return (
    <Popup
      onClose={() => setPopupOpen(false)}
      open
      hasCross
      title=""
      content={
        <Box>
          <Box sx={styles.headerWrapper}>
            <TrashIcon width={24} height={24} />
            <Typography variant="h6Bold">Видалити {name}</Typography>
          </Box>
          <Typography variant="body1">
            Чи дійсно ти бажаєш видалити {name}?
          </Typography>
        </Box>
      }
      sx={styles.wrapper}
      firstButton={
        <Button
          text="Скасувати"
          size={ButtonSize.MEDIUM}
          color={ButtonColor.SECONDARY}
          variant={ButtonVariant.TEXT}
          sx={styles.button}
          onClick={() => setPopupOpen(false)}
        />
      }
      secondButton={
        <Button
          text="Видалити"
          size={ButtonSize.MEDIUM}
          variant={ButtonVariant.OUTLINE}
          sx={styles.button}
          onClick={handleDeleteSubmit}
        />
      }
    />
  );
};

export default DeletePopup;
