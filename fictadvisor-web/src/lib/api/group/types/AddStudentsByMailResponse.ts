interface StudentEmail {
  id: string;
  email: string;
}

export interface AddStudentsByMailResponse {
  users: StudentEmail[];
}
