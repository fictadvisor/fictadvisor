const name = (name: string) => {
  if (!name || name.length < 2) { return 'Ім\'я має містити хоча би 2 символи'; }

  if (name.length > 100) { return 'Ім\'я має містити не більше 100 символів'; }
};

const username = (name: string) => {
  if (!name || name.length < 5) { return 'Юзернейм має містити хоча би 5 символів'; }

  const isValid = /^[@a-zA-Z0-9_]+$/.test(name);

  if (!isValid) { return 'Юзернейм може містити лише літери латинського алфавіту, цифри або нижнє підкреслення'; }
};

const reviewContent = (content: string) => {
  if (!content || content.length < 100) { return 'Текст відгуку має містити хоча би 100 символів'; }
  if (content.length > 4096) { return 'Текст відгуку має містити не більше 4096 символів'; }
};

const firstName = (name: string) => {
  if (!name || name.length < 2) { return 'Ім\'я має містити хоча би 2 символи'; }

  if (name.length > 32) { return 'Ім\'я має містити не більше 32 символів'; }
};

const lastName = (name: string) => {
  if (!name || name.length < 2) { return 'Прізвище має містити хоча би 2 символи'; }

  if (name.length > 32) { return 'Прізвище має містити не більше 32 символів'; }
};

const middleName = (name: string) => {
  if (name == null || name.length === 0) {
    return;
  }

  if (name.length < 2) { return 'Ім\'я по батькові має містити хоча би 2 символи'; }

  if (name.length > 32) { return 'Ім\'я по батькові містити не більше 32 символів'; }
};

const validationMap = {
  name,
  username,
  reviewContent,
  lastName,
  middleName,
  firstName,
};

type ValidationType = keyof typeof validationMap;

export const validate = (type: ValidationType, value: string) => {
  return validationMap[type](value) ?? null;
};

export const validateGroup = (...group: [type: ValidationType, value: string][]) => {
  return group.map(v => validate(v[0], v[1])).filter(v => v != null);
};
