export interface CreateDisciplineDTO {
  groupId: string,
  subjectId: string,
  semester: number,
  year: number,
  isSelective?: boolean,
  evaluatingSystem: string,
  resource: string,
}