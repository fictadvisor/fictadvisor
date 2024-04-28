import { SelectiveDisciplinesDTO } from '@fictadvisor/utils/requests';
import { RemainingSelective } from '@fictadvisor/utils/responses';
import { FormikValues } from 'formik';

export const transformData = (data: {
  [key: string]: boolean;
}): SelectiveDisciplinesDTO => {
  const newData = [];
  for (const discipline in data) {
    if (data[discipline]) newData.push(discipline);
  }
  return { disciplines: newData };
};

export const getInitialValues = (disciplines: RemainingSelective[]) => {
  const initialValues: FormikValues = {};
  if (disciplines) {
    disciplines.forEach(
      discipline => (initialValues[discipline.disciplineId] = false),
    );
  }
  return initialValues;
};
