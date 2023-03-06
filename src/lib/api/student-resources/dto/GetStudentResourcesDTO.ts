export interface StudentResource {
  icon: string;
  id: string;
  name: string;
  link: string;
}

export interface GetStudentResourcesDTO {
  studentResources: StudentResource[];
}
