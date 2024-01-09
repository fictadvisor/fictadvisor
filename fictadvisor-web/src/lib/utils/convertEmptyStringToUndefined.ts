export function convertEmptyStringToUndefined<T extends Partial<object>>(
  obj: T,
) {
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'string' && value.trim().length === 0) {
      // @ts-expect-error because ts is a shit
      obj[key as keyof T] = undefined;
    } else if (typeof value === 'object') {
      // @ts-expect-error because ts is a shit
      convertEmptyStringToUndefined(value);
    }
  }
  return obj;
}
