export const wrapText = (text: string, maxLength: number) => {
  if (text.length < maxLength) {
    return text;
  }

  return `${text.substr(0, maxLength - 3)}...`;
};

export const getFullName = (lastName: string, firstName: string, middleName?: string) => {
  if (middleName) {
    return `${lastName} ${firstName} ${middleName}`;
  }

  return `${lastName} ${firstName}`;
};
