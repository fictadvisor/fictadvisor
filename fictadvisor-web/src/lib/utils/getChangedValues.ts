export function getChangedValues<T>(obj: T, initialValues: T): Partial<T> {
  const changedValues: Partial<T> = {};
  for (const key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      obj[key] !== initialValues[key as keyof T]
    ) {
      changedValues[key as keyof T] = obj[key];
    }
  }
  return changedValues;
}
