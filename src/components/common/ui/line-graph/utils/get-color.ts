const ColorMap: Record<string, string> = {
  good: 'green.700',
  average: 'amber.600',
  bad: 'warning.200',
};

const getColor = (value: number) => {
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

export default getColor;
