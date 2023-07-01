import React, { FC } from 'react';
import { Tooltip as MuiTooltip } from '@mui/material';

import * as styles from './Tooltip.styles';
import { TooltipPosition, TooltipProps } from './types';

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
