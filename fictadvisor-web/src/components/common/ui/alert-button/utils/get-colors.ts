import {
  AlertButtonState,
  AlertButtonVariant,
} from '@/components/common/ui/alert-button/types';

const buttonColorsMap = {
  [AlertButtonVariant.ERROR_FILL]: {
    backgroundColor: [
      'error.300',
      'error.400',
      'error.500',
      'error.300',
      'backgroundDark.100',
    ],
    borderColor: [
      'transparent',
      'transparent',
      'transparent',
      'error.500',
      'transparent',
    ],
  },
  [AlertButtonVariant.ERROR_OUTLINE]: {
    backgroundColor: [
      'transparent',
      'error.300',
      'error.400',
      'error.300',
      'backgroundDark.100',
    ],
    borderColor: [
      'error.500',
      'error.500',
      'error.500',
      'error.500',
      'transparent',
    ],
  },
  [AlertButtonVariant.SUCCESS]: {
    backgroundColor: [
      'success.500',
      'success.400',
      'success.300',
      'success.500',
      'backgroundDark.100',
    ],
    borderColor: [
      'transparent',
      'transparent',
      'transparent',
      'success.300',
      'transparent',
    ],
  },
};

const stateMap = {
  [AlertButtonState.DEFAULT]: 0,
  [AlertButtonState.HOVER]: 1,
  [AlertButtonState.ACTIVE]: 2,
  [AlertButtonState.FOCUS]: 3,
  [AlertButtonState.DISABLED]: 4,
};

const getColors = (variant: AlertButtonVariant, state: AlertButtonState) => {
  const stateIndex = stateMap[state];
  return {
    backgroundColor: buttonColorsMap[variant].backgroundColor[stateIndex],
    borderColor: buttonColorsMap[variant].borderColor[stateIndex],
  };
};

export default getColors;
