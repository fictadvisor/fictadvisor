import { CommentsSortBy } from '@fictadvisor/utils/enums';
import { QueryAllCommentsDTO } from '@fictadvisor/utils/requests';

import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

export const initialValues: QueryAllCommentsDTO = {
  search: '',
  order: 'asc',
  sort: CommentsSortBy.TEACHER,
  semesters: [],
};

export const sortOptions: DropDownOption[] = [
  { id: 'teacher', label: 'За викладачем' },
  { id: 'semester', label: 'За семестром' },
  { id: 'subject', label: 'За предметом' },
];
