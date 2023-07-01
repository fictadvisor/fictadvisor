import { FC, memo } from 'react';
import { Box, Slide, Snackbar } from '@mui/material';

import Alert from '@/components/common/ui/alert-mui';
import {
  AlertType,
  AlertVariant,
} from '@/components/common/ui/alert-mui/types';

import * as styles from './Toast.styles';

const AUTO_HIDE_DURATION = 12000;

interface ToastProps {
  open: boolean;
  onClose: () => void;
  title: string;
  type: AlertType;
  description?: string;
  timer?: number;
}

const Toast: FC<ToastProps> = ({
  open,
  onClose,
  title,
  type,
  description,
  timer,
}) => {
  return (
    <Snackbar
      key={title + type + description}
      TransitionComponent={props => <Slide {...props} direction="left" />}
      open={open}
      ClickAwayListenerProps={{ onClickAway: () => null }}
      autoHideDuration={timer ?? AUTO_HIDE_DURATION}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      sx={styles.toast}
    >
      <Box>
        <Alert
          type={type}
          title={title}
          description={description}
          onClose={onClose}
          variant={AlertVariant.FILLED}
        />
      </Box>
    </Snackbar>
  );
};

export default memo(Toast);
