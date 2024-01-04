const checkValue = (value: number) => {
  if (value < 0) return 0;
  if (value > 100) return 100;
  return value;
};

export default checkValue;
