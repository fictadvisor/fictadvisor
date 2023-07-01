import {
  IconButtonColor,
  IconButtonState,
} from '@/components/common/ui/icon-button-mui/types';

const ColorMap: Record<IconButtonColor, string[]> = {
  [IconButtonColor.PRIMARY]: [
    'primary.800',
    'primary.500',
    'primary.logo',
    'primary.800',
    'primary.900',
  ],
  [IconButtonColor.ERROR]: [
    'backgroundDark.400',
    'error.400',
    'error.500',
    'backgroundDark.400',
    'error.500',
  ],
  [IconButtonColor.SUCCESS]: [
    'success.500',
    'success.400',
    'success.300',
    'success.500',
    'success.800',
  ],
  [IconButtonColor.SECONDARY]: [
    'backgroundDark.200',
    'backgroundDark.400',
    'backgroundDark.500',
    'backgroundDark.400',
    'backgroundDark.600',
  ],
  [IconButtonColor.TRANSPARENT]: [
    'transparent',
    'transparent',
    'transparent',
    'transparent',
    'transparent',
  ],
};
const ColorIndexMap: Record<IconButtonState, number> = {
  [IconButtonState.DEFAULT]: 0,
  [IconButtonState.HOVER]: 1,
  [IconButtonState.ACTIVE]: 2,
  [IconButtonState.FOCUSED]: 3,
  [IconButtonState.BORDER]: 4,
};

const getColor = (color: IconButtonColor, state: IconButtonState) => {
  const index = ColorIndexMap[state];
  return ColorMap[color][index];
};
export default getColor;
