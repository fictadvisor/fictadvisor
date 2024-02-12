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
