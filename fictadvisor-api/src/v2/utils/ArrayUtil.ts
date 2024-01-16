export function checkIfArrayIsUnique (myArray) {
  return myArray.length === new Set(myArray).size;
}

export async function filterAsync<T> (array: T[], callback: (item: T) => Promise<boolean>) {
  const booleans = await Promise.all(array.map(callback));
  return array.filter((item, i) => booleans[i]);
}

export async function mapAsync<T, V = object> (array: T[], callback: (item: T, index: number) => Promise<V>): Promise<V[]> {
  return Promise.all(array.map(callback));
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
