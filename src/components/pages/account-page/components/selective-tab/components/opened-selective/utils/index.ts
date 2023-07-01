import { FormikValues } from 'formik';

import { PostSelectiveDisciplinesBody } from '@/lib/api/user/types/PostSelectiveDisciplinesBody';
import { UserRemainingSelective } from '@/types/user';

export const transformData = (data: {
  [key: string]: boolean;
}): PostSelectiveDisciplinesBody => {
  const newData = [];
  for (const discipline in data) {
    if (data[discipline]) newData.push(discipline);
  }
  return { disciplines: newData };
};

export const getInitialValues = (disciplines: UserRemainingSelective[]) => {
  const initialValues: FormikValues = {};
  disciplines.forEach(
    discipline => (initialValues[discipline.disciplineId] = false),
  );
  return initialValues;
};
