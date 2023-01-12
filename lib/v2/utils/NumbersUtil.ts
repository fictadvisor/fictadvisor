export class NumbersUtil {
  static pluralize(value: number, one: string, two: string, five: string) {
    value = Math.abs(value) % 100;

    const num = value % 10;

    if (value > 10 && value < 20) {
      return five;
    }
    if (num > 1 && num < 5) {
      return two;
    }
    if (num === 1) {
      return one;
    }

    return five;
  }

  static toInteger(value: any, defaultValue: number = null) {
    if (value == null) {
      return defaultValue;
    }
    const num = parseInt(value, 10);
    return Number.isSafeInteger(num) ? num : defaultValue;
  }
}
