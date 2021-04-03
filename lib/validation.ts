const firstName = (name: string) => {
  if (!name || name.length < 2) { return 'Ім\'я має містити хоча би 2 символи'; }

  if (name.length > 24) { return 'Ім\'я має містити не більше 24 символів'; }
};

const lastName = (name: string) => {
  if (name === '') { return; }
  if (name.length < 2) { return 'Прізвище має містити хоча би 2 символи'; }
  if (name.length > 24) { return 'Прізвище має містити не більше 24 символів'; }
};

const username = (name: string) => {
  if (!name || name.length < 5) { return 'Юзернейм має містити хоча би 5 символів'; }

  if (name.length > 24) { return 'Юзернейм має містити не більше 24 символів'; }

  const isValid = /^[a-zA-Z0-9._]+$/.test(name);

  if (!isValid) { return 'Юзернейм може містити лише літери латинського алфавіту, цифри, крапку та нижнє підкреслення'; }
};

const validationMap = {
  firstName,
  lastName,
  username,
};

type ValidationType = keyof typeof validationMap;

export const validate = (type: ValidationType, value: string) => {
  return validationMap[type](value) ?? null;
};

export const validateGroup = (...group: [type: ValidationType, value: string][]) => {
  return group.map(v => validate(v[0], v[1])).filter(v => v != null);
};
