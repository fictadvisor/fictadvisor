export function checkIfArrayIsUnique (myArray) {
  return myArray.length === new Set(myArray).size;
}

export async function filterAsync<T> (array: T[], callback: (item: T) => Promise<boolean>) {
  const booleans = await Promise.all(array.map(callback));
  return array.filter((item, i) => booleans[i]);
}

export async function mapAsync<T> (array: T[], callback: (item: T) => Promise<object>) {
  const arr = [];
  for (const item of array) {
    arr.push(await callback(item));
  }
  return arr;
}

export function some<T, K extends keyof T> (objs: Array<T>, field: K, comp: any): boolean {
  return objs.some((obj) => obj[field] === comp);
}

export function find <T, K extends keyof T> (objs: Array<T>, field: K, comp: any): T | undefined {
  return objs.find((obj) => obj[field] === comp);
}

export function every <T, K extends keyof T> (objs: Array<T>, field: K, comp: any): boolean {
  return objs.every((obj) => obj[field] === comp);
}
