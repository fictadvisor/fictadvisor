import { styled } from '@mui/material/styles';
import { alpha } from '@mui/system';

import { ControlsColorMap } from '../constants';

interface IconProps {
  color: string;
  disabled?: boolean;
}

export const Icon = styled('span')<IconProps>(({ theme, color, disabled }) => ({
  borderRadius: '2px',
  width: '18px',
  height: '18px',
  transition: 'all 0.8s ease-in-out',
  boxShadow: `0px 0px 0px 2px ${alpha(
    disabled ? theme.palette.grey[300] : ControlsColorMap[color],
    1,
  )}`,
}));

export default Icon;
