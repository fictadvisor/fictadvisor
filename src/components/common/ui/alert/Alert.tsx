import React, { FC } from 'react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Alert as MuiAlert, AlertColor, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Alert.styles';
import { AlertType, AlertVariant } from './types';

const AlertIconMap: Record<AlertColor, React.ReactNode> = {
  info: <InformationCircleIcon />,
  error: <ExclamationTriangleIcon />,
  warning: <ExclamationCircleIcon />,
  success: <CheckCircleIcon />,
};

interface AlertProps {
  title: string;
  type?: AlertType;
  description?: string;
  variant?: AlertVariant;
  onClose?: () => void;
  sx?: SxProps<Theme>;
}
const Alert: FC<AlertProps> = ({
  type = AlertType.ERROR,
  variant = AlertVariant.FILLED,
  title,
  onClose,
  description,
  sx = {},
}) => {
  const MUIVariant =
    variant === AlertVariant.OUTLINED
      ? AlertVariant.OUTLINED
      : AlertVariant.FILLED;

  return (
    <MuiAlert
      severity={type}
      variant={MUIVariant}
      iconMapping={AlertIconMap}
      action={onClose && <XMarkIcon onClick={onClose} />}
      sx={mergeSx(styles.alert(type, variant), sx)}
    >
      <Typography variant="body2Medium">{title}</Typography>
      {description && <Typography variant="body1">{description}</Typography>}
    </MuiAlert>
  );
};

export default Alert;
