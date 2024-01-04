import { styled } from '@mui/material/styles';

import { ControlsColorMap } from '../constants';
import { CheckboxColor } from '../types';

interface IconProps {
  color: CheckboxColor;
  disabled?: boolean;
}

export const Icon = styled('span')<IconProps>(({ theme, color, disabled }) => ({
  borderRadius: '2px',
  width: '18px',
  height: '18px',
  transition: 'all 0.8s ease-in-out',
  boxShadow: `0px 0px 0px 2px ${
    disabled ? theme.palette.grey[300] : ControlsColorMap[color]
  }`,
}));

export default Icon;
