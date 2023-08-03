import { FormikValues } from 'formik';

export const preparePriorityData = (values: FormikValues) => {
  if (values.specialty === '121') {
    values.priorities[3] = '';
  }
  if (values.isToAdmission) {
    values.email = '';
  }
};
