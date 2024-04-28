import {
  MarkResponse,
  PaginatedQuestionCommentsResponse,
  SubjectResponse,
  TeacherWithContactsFullResponse,
} from '@fictadvisor/utils/responses';

export interface TeacherButtonInfo {
  text: string;
  href: string;
}

export interface TeacherPageInfo {
  subjects: SubjectResponse[];
  comments: PaginatedQuestionCommentsResponse;
  marks: MarkResponse[];
  hasEnoughMarks: boolean;
  marksText: string;
  commentText: string;
  buttonInfo: TeacherButtonInfo[];
}

export interface TeacherSubjectPageInfo {
  info: TeacherWithContactsFullResponse;
  comments: PaginatedQuestionCommentsResponse;
  marks: MarkResponse[];
  marksText: string;
  commentText: string;
  hasEnoughMarks: boolean;
  buttonInfo: TeacherButtonInfo[];
}
