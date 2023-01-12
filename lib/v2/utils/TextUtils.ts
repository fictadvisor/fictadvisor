export class TextUtil {
  static wrapText(text: string, maxLength: number) {
    if (text.length < maxLength) {
      return text;
    }

    return `${text.substr(0, maxLength - 3)}...`;
  }

  static getFullName(lastName: string, firstName: string, middleName?: string) {
    if (middleName) {
      return `${lastName} ${firstName} ${middleName}`;
    }
    return `${lastName} ${firstName}`;
  }

  static mergeClassName(defaultValue: string, className: string) {
    if (!className) {
      return defaultValue;
    }
    return `${defaultValue} ${className}`;
  }
}
