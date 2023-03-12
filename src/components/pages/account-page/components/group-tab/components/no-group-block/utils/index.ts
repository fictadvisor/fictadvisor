export const transformGroups = data =>
  data.map(group => ({
    label: group.code,
    value: group.id,
  }));
