export interface PickDirection<O, T extends keyof O> {
  key: T
  mapTo?: string
  default?: O[T]
}

export const pick = <O, T extends keyof O>(
  obj: O,
  ...keys: Array<T | PickDirection<O, T>>
) => {
  const subset: Partial<O> = {};

  for (const key of keys) {
    if (typeof key === 'object') {
      const value = obj[key.key];
      subset[(key.mapTo ?? key.key) as any] =
        value == null ? key.default ?? null : value;
    } else {
      const value = obj[key];
      subset[key] = value == null ? null : value;
    }
  }

  return subset;
};

export const assign = <T>(instance: T, values: Partial<T>): T => {
  for (const key in values) {
    instance[key] = values[key];
  }

  return instance;
};
