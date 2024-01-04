import { FC, memo } from 'react';
import { Box, Slide, Snackbar } from '@mui/material';

import Alert from '@/components/common/ui/alert';
import { AlertType, AlertVariant } from '@/components/common/ui/alert/types';

import * as styles from './Toast.styles';

const AUTO_HIDE_DURATION = 12000;

interface ToastProps {
  /**
   * Toast title
   */
  title: string;
  /**
   * Toast visibility status
   */
  open: boolean;
  /**
   * Toast onClose function
   */
  onClose: () => void;
  /**
   * Toast type
   */
  type: AlertType;
  /**
   * Optional toast description
   */
  description?: string;
  /**
   * Optional toast timer duration in milliseconds
   */
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
      sx={styles.toast(open)}
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
