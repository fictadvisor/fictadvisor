const specialities = {
  121: 'Інженерія програмного забезпечення',
  123: "Комп'ютерна інженерія",
  126: 'Інформаційні системи та технології',
};

export const getSpecialityName = (number: string) => {
  const entries = Object.entries(specialities);
  for (const [num, name] of entries) {
    if (num === number) return name;
  }
};
