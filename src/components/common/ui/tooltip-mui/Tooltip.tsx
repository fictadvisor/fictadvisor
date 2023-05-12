import React, { FC } from 'react';
import { SxProps, Theme, Tooltip as TooltipMui } from '@mui/material';

import * as styles from './Tooltip.styles';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  text: string;
  hasArrow?: boolean;
  position?: TooltipPosition;
  children?: React.ReactElement;
  sx?: SxProps<Theme>;
}
const Tooltip: FC<TooltipProps> = ({
  text,
  hasArrow = true,
  position = 'bottom',
  children,
  sx,
}) => {
  return (
    <TooltipMui
      sx={sx}
      componentsProps={{
        tooltip: { sx: styles.tooltip },
        arrow: { sx: styles.arrow },
      }}
      title={text}
      arrow={hasArrow}
      placement={position}
    >
      {children}
    </TooltipMui>
  );
};

export default Tooltip;
