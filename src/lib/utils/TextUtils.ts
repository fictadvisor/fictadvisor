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

  static mergeClassNames() {
    return (
      Array.prototype.slice
        // eslint-disable-next-line prefer-rest-params
        .call(arguments)
        .reduce(function (classList, arg) {
          return classList.concat(arg);
        }, [])
        .filter(function (arg) {
          return typeof arg === 'string';
        })
        .join(' ')
    );
  }
}
