const ColorMap: Record<string, string> = {
  good: 'green.700',
  average: 'amber.500',
  bad: 'error.400',
};

const colorInfo = value => {
  if (value > 70) {
    return ColorMap.good;
  }
  if (value < 40) {
    return ColorMap.bad;
  }
  if (value <= 70) {
    return ColorMap.average;
  }
};

export default colorInfo;
