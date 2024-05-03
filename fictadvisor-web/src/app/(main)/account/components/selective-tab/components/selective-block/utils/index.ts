export const fillArray = (
  arr: string[],
  newLength: number,
  fillString: string,
) => {
  const newArr = [...arr];
  while (newArr.length < newLength) {
    newArr.push(fillString);
  }
  return newArr;
};
