import { alpha, styled } from '@mui/material/styles';

import theme from '@/styles/theme';

import { ControlsColorMap } from '../constants';

import { Icon } from './Icon';

export const CheckedIcon = styled(Icon)(({ color, disabled }) => ({
  width: '18px',
  height: '18px',
  background: `${alpha(
    disabled ? theme.palette.grey[300] : ControlsColorMap[color],
    1,
  )}`,
  '&:before': {
    display: 'block',
    backgroundImage: 'url(/icons/check-mark.svg)',
    content: '""',
    width: '14px',
    height: '11.57px',
    transform: 'translate(15%,25%)',
  },
}));

export default CheckedIcon;
