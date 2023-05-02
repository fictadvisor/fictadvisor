import { IconButtonColorType } from '@/components/common/ui/icon-button-mui/IconButton';
const ColorMap: Record<IconButtonColorType, string[]> = {
  primary: [
    'primary.800',
    'primary.500',
    'primary.logo',
    'primary.800',
    'primary.900',
  ],
  error: [
    'backgroundDark.400',
    'error.400',
    'error.500',
    'backgroundDark.400',
    'error.500',
  ],
  success: [
    'success.500',
    'success.400',
    'success.300',
    'success.500',
    'success.800',
  ],

  secondary: [
    'backgroundDark.200',
    'backgroundDark.400',
    'backgroundDark.500',
    'backgroundDark.400',
    'backgroundDark.600',
  ],
  transparent: [
    'transparent',
    'transparent',
    'transparent',
    'transparent',
    'transparent',
  ],
};
const ColorIndexMap = {
  default: 0,
  hover: 1,
  active: 2,
  focused: 3,
  border: 4,
};
const getColor = (color, state) => {
  const index = ColorIndexMap[state];
  return ColorMap[color][index];
};
export default getColor;
