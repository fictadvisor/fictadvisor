export function nonEmptyObject<T extends object> (obj: T): (T | undefined) {
  // Express 5 leaves req.body/req.query undefined when absent (Express 4 used
  // {}), so guard against null/undefined before Object.keys.
  return !obj || Object.keys(obj).length === 0 ? undefined : obj;
}

export function formattedJson (obj: object, indent: (string | number) = '\t'): string {
  return JSON.stringify(obj, null, indent);
}
