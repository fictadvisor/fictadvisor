const buttonColorsMap = {
  error_fill: {
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
  error_outline: {
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

  success: {
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
  default: 0,
  hover: 1,
  active: 2,
  focus: 3,
  disabled: 4,
};
const getColors = (variant, state) => {
  const stateIndex = stateMap[state];
  return {
    backgroundColor: buttonColorsMap[variant].backgroundColor[stateIndex],
    borderColor: buttonColorsMap[variant].borderColor[stateIndex],
  };
};

export default getColors;
