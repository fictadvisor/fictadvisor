import * as yup from 'yup';
import { TestConfig } from 'yup';

import { areValuesUnique } from '../../../utils/areValuesUnique';

const timeTest: TestConfig = {
  name: 'startTimeGreaterThanEndTime',
  test: (value, context) => {
    const { startTime, endTime } = context.parent;
    const startTimeMs = new Date(startTime).getTime();
    const endTimeMs = new Date(endTime).getTime();

    if (!startTime || !endTime) return true;

    return endTimeMs > startTimeMs;
  },
  message: 'Неправильний час',
};

const uniqueTeachersTest: TestConfig = {
  name: 'uniqueTeachersTest',
  test: (value, context) => {
    return areValuesUnique(context.parent.teachers);
  },
  message: 'Вчителі не можуть повторюватися',
};
export const formValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Обовʼязкове поле')
    .min(2, 'Не коротше 2 символів')
    .max(150, 'Не довше 150 символів'),
  startTime: yup.string().required('Обовʼязкове поле').test(timeTest),
  endTime: yup.string().required('Обовʼязкове поле'),
  teachers: yup.array().when('eventType', ([type], schema) => {
    return type !== 'OTHER'
      ? schema
          .min(1, 'Додайте хоча б одного вчителя')
          .of(yup.string().required('Викладач обовʼязковий'))
          .test(uniqueTeachersTest)
      : schema.optional();
  }),
  eventInfo: yup.string().max(2000, 'Не довше 2000 символів'),
  disciplineInfo: yup.string().max(2000, 'Не довше 2000 символів'),
  period: yup.string().required("Обов'язкове поле"),
  url: yup.string().url('Неправильне посилання'),
  disciplineId: yup.string().when('eventType', ([type], schema) => {
    return type !== 'OTHER'
      ? schema.required("Обов'язкове поле")
      : schema.optional();
  }),
});
