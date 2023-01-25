export const toInteger = (value: any, defaultValue: number = null) => {
  if (value == null) {
    return defaultValue;
  }

  const num = parseInt(value, 10);
  return Number.isSafeInteger(num) ? num : defaultValue;
};
