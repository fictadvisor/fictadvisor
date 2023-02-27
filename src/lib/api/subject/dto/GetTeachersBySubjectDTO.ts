export interface GetTeachersBySubjectDTO {
  teachers: [
    {
      name: string;
      id: string;
      role: string;
    },
  ];
}
