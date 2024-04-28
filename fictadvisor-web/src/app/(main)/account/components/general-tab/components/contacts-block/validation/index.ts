import { CreateContactDTO } from '@fictadvisor/utils/requests';
import * as yup from 'yup';

import { ContactType } from '@/types/contact';

export const validationSchema = yup.object().shape({
  displayName: yup.string().required(`Обов'язкове поле`),
  link: yup
    .string()
    .required(`Обов'язкове поле`)
    .url('Неправильний формат посилання'),
  name: yup.string().required(`Обов'язкове поле`),
});

export const initialValues: CreateContactDTO = {
  name: ContactType.TELEGRAM,
  link: '',
  displayName: '',
};
