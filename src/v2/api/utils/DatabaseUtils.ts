export class DatabaseUtils {
  static getSelectObject<T extends object>(fields: string[] = []) {
    const result: { select?: T } = {}
    if (fields.length !== 0) result.select = {} as T;

    for (const field of fields) {
      result.select[field] = true;
    }

    return result;
  }
}