export function checkIfArrayIsUnique (myArray) {
  return myArray.length === new Set(myArray).size;
}

export async function filterAsync<T> (array: T[], callback: (item: T) => Promise<boolean>) {
  const booleans = await Promise.all(array.map(callback));
  return array.filter((item, i) => booleans[i]);
}
