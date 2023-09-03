import * as yup from 'yup';
import { TestConfig } from 'yup';

import { areValuesUnique } from '../../../utils/areValuesUnique';

const timeTest: TestConfig = {
  name: 'startTimeGreaterThanEndTime',
  test: (value, context) => {
    const { startTime, endTime } = context.parent;
    const startTimeMs = new Date(startTime).getTime();
    const endTimeMs = new Date(endTime).getTime();

    return endTimeMs > startTimeMs;
  },
  message: 'Подія не може починатися пізніше ніж закінчується',
};

const uniqueTeachersTest: TestConfig = {
  name: 'uniqueTeachersTest',
  test: (value, context) => {
    return areValuesUnique(context.parent.teachers);
  },
  message: 'Вчителі не можуть повторюватися',
};
export const editFormValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Обовʼязкове поле')
    .min(2, 'Не коротше 2 символів')
    .max(100, 'Не довше 100 символів'),
  startTime: yup.string().required('Обовʼязкове поле').test(timeTest),
  endTime: yup.string().required('Обовʼязкове поле'),
  teachers: yup.array().test(uniqueTeachersTest),
  period: yup.string(),
  url: yup.string(),
  //eventInfo: yup.string().max(2000, 'Не довше 2000 символів'),
  //disciplineInfo: yup.string().max(2000, 'Не довше 2000 символів'),
});

export const addEventFormValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Обовʼязкове поле')
    .min(2, 'Не коротше 2 символів')
    .max(100, 'Не довше 100 символів'),
  startTime: yup.string().required('Обовʼязкове поле').test(timeTest),
  endTime: yup.string().required('Обовʼязкове поле').test(timeTest),
  teachers: yup.array().test(uniqueTeachersTest),
  period: yup.string(),
  url: yup.string(),
  //eventInfo: yup.string().max(2000, 'Не довше 2000 символів'),
  //disciplineInfo: yup.string().max(2000, 'Не довше 2000 символів'),
});
