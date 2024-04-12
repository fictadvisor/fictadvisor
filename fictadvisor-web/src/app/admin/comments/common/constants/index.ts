import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

import { CommentsAdminSearchFormFields } from '../types';

export const initialValues: CommentsAdminSearchFormFields = {
  search: '',
  order: 'asc',
  sort: 'teacher',
  semesters: [],
};

export const sortOptions: DropDownOption[] = [
  { id: 'teacher', label: 'За викладачем' },
  { id: 'semester', label: 'За семестром' },
  { id: 'subject', label: 'За предметом' },
];
