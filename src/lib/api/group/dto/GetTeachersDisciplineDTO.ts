export type GetTeachersDisciplineDTO = {
  disciplines: [{
    id: string,
    subjectName: string,
    teachers: [{
      disciplineTeacherId: string,
      id: string,
      firstName: string,
      middleName: string,
      lastName: string,
      roles: string[],
      avatar: string,
      description: string,
    }],
  }]
}