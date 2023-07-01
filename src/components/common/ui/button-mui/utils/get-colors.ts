import {
  ButtonColor,
  ButtonColorsMap,
  ButtonState,
  ButtonVariant,
} from '../types';

const buttonColorsMap: ButtonColorsMap = {
  [ButtonVariant.FILLED]: {
    [ButtonColor.PRIMARY]: {
      backgroundColor: [
        'primary.800',
        'primary.500',
        'primary.logo',
        'primary.logo',
        'backgroundDark.600',
      ],
      borderColor: [
        'transparent',
        'transparent',
        'transparent',
        'primary.200',
        'transparent',
      ],
      textColorDisabled: 'grey.600',
    },
    [ButtonColor.SECONDARY]: {
      backgroundColor: [
        'backgroundDark.200',
        'backgroundDark.300',
        'backgroundDark.400',
        'backgroundDark.200',
        'backgroundDark.100',
      ],
      borderColor: [
        'transparent',
        'transparent',
        'transparent',
        'backgroundDark.400',
        'transparent',
      ],
      textColorDisabled: 'backgroundDark.400',
    },
  },

  [ButtonVariant.OUTLINE]: {
    [ButtonColor.PRIMARY]: {
      backgroundColor: [
        'transparent',
        'primary.50',
        'primary.200',
        'primary.100',
        'transparent',
      ],
      borderColor: [
        'primary.500',
        'primary.500',
        'primary.logo',
        'primary.500',
        'grey.400',
      ],
      textColorDisabled: 'grey.400',
    },
    [ButtonColor.SECONDARY]: {
      backgroundColor: [
        'transparent',
        'backgroundDark.200',
        'backgroundDark.300',
        'backgroundDark.200',
        'backgroundDark.100',
      ],
      borderColor: [
        'backgroundDark.600',
        'backgroundDark.600',
        'backgroundDark.500',
        'backgroundDark.500',
        'transparent',
      ],
      textColorDisabled: 'grey.200',
    },
  },
};

const stateMap: Record<ButtonState, number> = {
  [ButtonState.DEFAULT]: 0,
  [ButtonState.HOVER]: 1,
  [ButtonState.ACTIVE]: 2,
  [ButtonState.FOCUSED]: 3,
  [ButtonState.DISABLED]: 4,
};
const getColors = (
  color: ButtonColor,
  variant: Exclude<ButtonVariant, ButtonVariant.TEXT>,
  state: ButtonState,
) => {
  const stateIndex = stateMap[state];
  return {
    backgroundColor:
      buttonColorsMap[variant][color].backgroundColor[stateIndex],
    borderColor: buttonColorsMap[variant][color].borderColor[stateIndex],
    colorDisabled: buttonColorsMap[variant][color].textColorDisabled,
  };
};

export default getColors;
