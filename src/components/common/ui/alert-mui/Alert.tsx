import React, { FC } from 'react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { Alert as MuiAlert, AlertColor, Typography } from '@mui/material';

import { AlertXMark } from '@/components/common/icons/AlertXMark';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './Alert.styles';
import { AlertProps, AlertType, AlertVariant } from './types';

const AlertIconMap: Record<AlertColor, React.ReactNode> = {
  info: <InformationCircleIcon />,
  error: <ExclamationTriangleIcon />,
  warning: <ExclamationCircleIcon />,
  success: <CheckCircleIcon />,
};

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
      // TODO: wrap icon with button and get rid of onClick prop on svg
      action={onClose && <AlertXMark onClick={onClose} />}
      sx={mergeSx(styles.alert(type, variant), sx)}
    >
      <Typography variant="body2Medium">{title}</Typography>
      {description && <Typography variant="body1">{description}</Typography>}
    </MuiAlert>
  );
};

export default Alert;
