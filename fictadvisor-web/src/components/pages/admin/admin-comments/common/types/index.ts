import * as yup from 'yup';

export const createValidationSchema = () => {
  return yup.object().shape({
    textAreaValidate: yup
      .string()
      .min(4, 'Текст повинен містити не менше 4 символів')
      .max(4000, 'Текст повинен містити не більше 4000 символів'),
  });
};

import { Semester } from '@/types/dates';

export interface CommentsAdminSearchFormFields {
  search: string;
  order: 'asc' | 'desc';
  sort: 'teacher' | 'semester' | 'subject';
  semesters: Semester[];
}

export interface CommentSearchProps {
  onSubmit: (values: Partial<CommentsAdminSearchFormFields>) => void;
}
