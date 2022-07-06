const name = (name: string) => {
  const MIN_LENGTH = 2;
  const MAX_LENGTH = 100;

  if (!name || name.length < MIN_LENGTH) {
    return `Ім\'я має містити хоча би ${MIN_LENGTH} символи`;
  }
  if (name.length > MAX_LENGTH) {
    return `Ім\'я має містити не більше ${MAX_LENGTH} символів`;
  }
};

const username = (name: string) => {
  const MIN_LENGTH = 5;
  const VALIDATING_REGEX = /^[@a-zA-Z0-9_]+$/;

  if (!name || name.length < MIN_LENGTH) {
    return `Юзернейм має містити хоча би ${MIN_LENGTH} символів`;
  }

  const isValid = VALIDATING_REGEX.test(name);

  if (!isValid) {
    return 'Юзернейм може містити лише літери латинського алфавіту, цифри або нижнє підкреслення';
  }
};

const reviewContent = (content: string) => {
  const MIN_LENGTH = 100;
  const MAX_LENGTH = 4096;

  if (!content || content.length < MIN_LENGTH) {
    return `Текст відгуку має містити хоча би ${MIN_LENGTH} символів`;
  }
  if (content.length > MAX_LENGTH) {
    return `Текст відгуку має містити не більше ${MAX_LENGTH} символів`;
  }
};

const firstName = (name: string) => {
  const MIN_LENGTH = 2;
  const MAX_LENGTH = 32;

  if (!name || name.length < MIN_LENGTH) {
    return `Ім\'я має містити хоча би ${MIN_LENGTH} символи`;
  }
  if (name.length > MAX_LENGTH) {
    return `Ім\'я має містити не більше ${MAX_LENGTH} символів`;
  }
};

const lastName = (name: string) => {
  const MIN_LENGTH = 2;
  const MAX_LENGTH = 32;

  if (!name || name.length < MIN_LENGTH) {
    return `Прізвище має містити хоча би ${MIN_LENGTH} символи`;
  }
  if (name.length > MAX_LENGTH) {
    return `Прізвище має містити не більше ${MAX_LENGTH} символів`;
  }
};

const middleName = (name: string) => {
  if (name == null || name.length === 0) {
    return;
  }

  const MIN_LENGTH = 2;
  const MAX_LENGTH = 32;

  if (name.length < MIN_LENGTH) {
    return `Ім\'я по батькові має містити хоча би ${MIN_LENGTH} символи`;
  }
  if (name.length > MAX_LENGTH) {
    return `Ім\'я по батькові має містити не більше ${MAX_LENGTH} символів`;
  }
};

const subjectName = (name: string) => {
  const MIN_LENGTH = 3;
  const MAX_LENGTH = 64;

  if (name.length < MIN_LENGTH) {
    return `Назва предмету має містити хоча би ${MIN_LENGTH} символи`;
  }
  if (name.length > MAX_LENGTH) {
    return `Назва предмету має містити не більше ${MAX_LENGTH} символів`;
  }
};

const contactName = (name: string) => {
  const MIN_LENGTH = 3;
  const MAX_LENGTH = 12;

  if (name.length < MIN_LENGTH) {
    return `Назва контакту має містити хоча би ${MIN_LENGTH} символи`;
  }
  if (name.length > MAX_LENGTH) {
    return `Назва контакту має містити не більше ${MAX_LENGTH} символів`;
  }
};

const contactValue = (value: string) => {
  const MIN_LENGTH = 3;
  const MAX_LENGTH = 48;

  if (value.length < MIN_LENGTH) {
    return `Назва контакту має містити хоча би ${MIN_LENGTH} символи`;
  }
  if (value.length > MAX_LENGTH) {
    return `Назва контакту має містити не більше ${MAX_LENGTH} символів`;
  }
};

const validationMap = {
  name,
  username,
  reviewContent,
  lastName,
  middleName,
  firstName,
  subjectName,
  contactName,
  contactValue,
};

type ValidationType = keyof typeof validationMap;

export const validate = (type: ValidationType, value: string) => {
  return validationMap[type](value) ?? null;
};

export const validateGroup = (...group: [type: ValidationType, value: string][]): string[] => {
  return group.map(v => validate(v[0], v[1])).filter(v => v != null);
};
