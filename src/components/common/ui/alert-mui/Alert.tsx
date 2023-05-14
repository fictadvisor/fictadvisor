import React, { FC } from 'react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { Alert as MUIAlert, AlertColor, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import { AlertXMark } from '@/components/common/custom-svg/AlertXMark';
import * as styles from '@/components/common/ui/alert-mui/Alert.styles';

export type AlertType = 'info' | 'warning' | 'error' | 'success';

export type AlertVariantType =
  | 'filled'
  | 'darker'
  | 'outlined'
  | 'border-left'
  | 'border-top';

interface AlertProps {
  title: string;
  type?: AlertType;
  description?: string;
  variant?: AlertVariantType;
  onClose?: () => void;
  sx?: SxProps<Theme>;
}

const AlertIconMap: Record<AlertColor, React.ReactNode> = {
  info: <InformationCircleIcon />,
  error: <ExclamationTriangleIcon />,
  warning: <ExclamationCircleIcon />,
  success: <CheckCircleIcon />,
};

const Alert: FC<AlertProps> = ({
  type = 'error',
  variant = 'filled',
  title,
  onClose,
  description,
}) => {
  const MUIVariant = variant === 'outlined' ? 'outlined' : 'filled';

  return (
    <MUIAlert
      severity={type}
      variant={MUIVariant}
      iconMapping={AlertIconMap}
      action={onClose && <AlertXMark onClick={onClose} />}
      sx={styles.alert(type, variant)}
    >
      <Typography variant="body2Medium">{title}</Typography>
      {description && <Typography variant="body1">{description}</Typography>}
    </MUIAlert>
  );
};

export default Alert;
