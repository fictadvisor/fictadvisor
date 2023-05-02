const buttonColorsMap = {
  filled: {
    primary: {
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
      textColorDisabled: ['grey.600'],
    },
    secondary: {
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
      textColorDisabled: ['backgroundDark.400'],
    },
  },

  outline: {
    primary: {
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
      textColorDisabled: ['grey.400'],
    },
    secondary: {
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
      textColorDisabled: ['grey.200'],
    },
  },
};

const stateMap = {
  default: 0,
  hover: 1,
  active: 2,
  focused: 3,
  disabled: 4,
};
const getColors = (color, variant, state) => {
  const stateIndex = stateMap[state];
  return {
    backgroundColor:
      buttonColorsMap[variant][color].backgroundColor[stateIndex],
    borderColor: buttonColorsMap[variant][color].borderColor[stateIndex],
    colorDisabled: buttonColorsMap[variant][color].textColorDisabled[0],
  };
};

export default getColors;
