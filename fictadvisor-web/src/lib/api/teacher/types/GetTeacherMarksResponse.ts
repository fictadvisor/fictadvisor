import { TeacherAmountMark, TeacherRadarCircleMark } from '@/types/teacher';

export interface GetTeacherMarksResponse {
  marks: (TeacherRadarCircleMark | TeacherAmountMark)[];
}
