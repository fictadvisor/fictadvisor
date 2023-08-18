export const transformValue = (value: string): string => {
  if (value.includes(',') || value.includes(';')) {
    value = value.replace(/,/g, '\n').replace(/;/g, '\n');
  }
  value = value.replace(/\s+/g, '\n').replace(/\n\n/g, '\n');

  return value;
};
