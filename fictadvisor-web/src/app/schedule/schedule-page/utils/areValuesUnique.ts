export const areValuesUnique = <T>(arr: T[]) => {
  for (let i = 0; i < arr.length; ++i) {
    for (let j = i; j < arr.length; ++j) {
      if (arr[i] === arr[j] && i !== j && arr[i] && arr[j]) return false;
    }
  }
  return true;
};
