export default interface AddDiscipline {
  groupId: string;
  subjectId: string;
  semester: number;
  year: number;
  isSelective?: boolean;
  description?: string;
  teachers?: {
    teacherId: string;
    roleNames: string[];
  }[];
}
