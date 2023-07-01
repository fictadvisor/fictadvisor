import { GetTeacherCommentsResponse } from '@/lib/api/teacher/types/GetTeacherCommentsResponse';
import { GetTeacherMarksResponse } from '@/lib/api/teacher/types/GetTeacherMarksResponse';
import { GetTeacherSubjectsResponse } from '@/lib/api/teacher/types/GetTeacherSubjectsResponse';
import { Teacher, TeacherWithSubject } from '@/types/teacher';

export interface TeacherButtonInfo {
  text: string;
  href: string;
}

export interface TeacherPageInfo {
  info: Teacher;
  subjects: GetTeacherSubjectsResponse['subjects'];
  comments: GetTeacherCommentsResponse;
  marks: GetTeacherMarksResponse['marks'];
  hasEnoughMarks: boolean;
  marksText: string;
  commentText: string;
  buttonInfo: TeacherButtonInfo[];
}

export interface TeacherSubjectPageInfo {
  info: TeacherWithSubject;
  comments: GetTeacherCommentsResponse;
  marks: GetTeacherMarksResponse['marks'];
  marksText: string;
  commentText: string;
  hasEnoughMarks: boolean;
  buttonInfo: TeacherButtonInfo[];
}
