const priorityName = {
  CSSE: "Інженерія програмного забезпечення комп'ютерних систем ",
  ISSE: 'Інженерія програмного забезпечення інформаційних систем',
  IIS: 'Інтегровані інформаційні системи',
  ISRS: 'Інформаційне забезпечення робототехнічних систем',
  IMST: 'Інформаційні управляючі системи та технології',
};

export const getPriorityName = (priority: string) => {
  const entries = Object.entries(priorityName);
  for (const [shortcut, name] of entries) {
    if (shortcut === priority) return name;
  }
};
