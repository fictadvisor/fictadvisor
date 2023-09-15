import React, { FC, MouseEvent, ReactNode, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { SxProps, Theme } from '@mui/material/styles';

import PopupsActions from '@/components/common/ui/pop-ups/PopupActions';
import PopupsContent from '@/components/common/ui/pop-ups/PopupContent';
import PopupsTitle from '@/components/common/ui/pop-ups/PopupTitle';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Popup.styles';

interface PopupProps {
  onClose: () => void;
  open: boolean;
  sx?: SxProps<Theme>;
  hasCross?: boolean;
  icon?: ReactNode;
  title: string;
  text: string;
  firstButton: ReactNode;
  secondButton?: ReactNode;
  contentLeft?: boolean;
}

const Popup: FC<PopupProps> = ({
  open,
  onClose,
  sx = {},
  hasCross = false,
  icon,
  title,
  text,
  firstButton,
  secondButton,
  contentLeft = false,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClose = (event: MouseEvent) => {
    if (
      dialogRef.current?.querySelector('.MuiDialog-container') === event.target
    )
      onClose();
  };

  return (
    <Dialog
      ref={dialogRef}
      sx={mergeSx(styles.popup(contentLeft), sx)}
      open={open}
      onClose={onClose}
      onClick={handleClose}
    >
      <PopupsTitle
        sx={styles.popupsTitle(contentLeft)}
        withCross={hasCross}
        onClose={onClose}
      >
        <Box sx={styles.checkCircleIcon}>{icon}</Box>
        <Typography sx={styles.popupsTitleText(contentLeft)}>
          {title}
        </Typography>
      </PopupsTitle>
      <PopupsContent sx={styles.popupsContent(contentLeft)}>
        {text}
      </PopupsContent>
      <PopupsActions>
        {firstButton}
        {secondButton}
      </PopupsActions>
    </Dialog>
  );
};

export default Popup;
