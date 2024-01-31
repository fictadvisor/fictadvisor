export interface StudentResource {
  imageLink: string;
  id: string;
  name: string;
  link: string;
}

export interface GetStudentResourcesResponse {
  studentResources: StudentResource[];
}
