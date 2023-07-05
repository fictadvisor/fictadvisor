import React, { FC, ReactElement } from 'react';
import { SxProps, Theme, Tooltip as MuiTooltip } from '@mui/material';

import * as styles from './Tooltip.styles';
import { TooltipPosition } from './types';

interface TooltipProps {
  text: string;
  hasArrow?: boolean;
  position?: TooltipPosition;
  children: ReactElement;
  sx?: SxProps<Theme>;
}

const Tooltip: FC<TooltipProps> = ({
  text,
  hasArrow = true,
  position = TooltipPosition.BOTTOM,
  children,
  sx,
}) => {
  return (
    <MuiTooltip
      sx={sx}
      slotProps={{
        tooltip: { sx: styles.tooltip },
        arrow: { sx: styles.arrow },
      }}
      title={text}
      arrow={hasArrow}
      placement={position}
    >
      {children}
    </MuiTooltip>
  );
};

export default Tooltip;
