import React, { FC, ReactElement } from 'react';
import { Tooltip as MuiTooltip, TooltipProps } from '@mui/material';

import * as styles from './Tooltip.styles';

interface StyledTooltipProps extends TooltipProps {
  children: ReactElement;
}

const Tooltip: FC<StyledTooltipProps> = ({ children, ...rest }) => {
  return (
    <MuiTooltip
      {...rest}
      slotProps={{
        tooltip: { sx: styles.tooltip },
        arrow: { sx: styles.arrow },
      }}
    >
      {children}
    </MuiTooltip>
  );
};

export default Tooltip;
