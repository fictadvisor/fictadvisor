export function isArrayUnique (myArray): boolean {
  return myArray.length === new Set(myArray).size;
}

export function makeUnique<T> (array: T[]): T[] {
  return Array.from(new Set(array));
}

export async function filterAsync<T> (array: T[], predicate: (item: T) => Promise<boolean>): Promise<T[]> {
  const booleans = await Promise.all(array.map(predicate));
  return array.filter((item, i) => booleans[i]);
}

export async function everyAsync<T> (array: T[], predicate: (item: T) => Promise<boolean>): Promise<boolean> {
  const booleans = await Promise.all(array.map(predicate));
  return booleans.every((b) => b);
}

export async function mapAsync<T, V = object> (array: T[], callback: (item: T, index: number) => Promise<V>): Promise<V[]> {
  return Promise.all(array.map(callback));
}

export function extractField<T, K extends keyof T> (objs: T[], field: K): T[K][] {
  return objs.map((obj) => obj[field]);
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
