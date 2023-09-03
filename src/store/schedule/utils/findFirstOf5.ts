export const findFirstOf5 = (week: number) => {
  const rem = week % 5 === 0 ? 5 : week % 5;
  return week - rem + 1;
};
