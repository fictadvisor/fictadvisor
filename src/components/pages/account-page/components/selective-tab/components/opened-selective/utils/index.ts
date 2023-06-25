import { PostSelectiveDisciplinesBody } from '@/lib/api/user/dto/PostSelectiveDisciplinesBody';

export const transformData = (
  data: { string: boolean }[],
): PostSelectiveDisciplinesBody => {
  const newData = [];
  for (const discipline in data) {
    if (data[discipline]) newData.push(discipline);
  }
  return { disciplines: newData };
};

export const getInitialValues = disciplines => {
  const initialValues = {};
  disciplines.forEach(
    discipline => (initialValues[discipline.disciplineId] = false),
  );
  return initialValues;
};
