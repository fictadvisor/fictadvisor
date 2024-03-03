export interface Discipline {
  id: string;
  year: number;
  isSelective: boolean;
  semester: number;
  subject: {
    id: string;
    name: string;
  };
}

export interface AdminDiscipline {
  id: string;
  year: number;
  isSelective: boolean;
  semester: number;
  name: string;
  group: {
    id: string;
    code: string;
  };
  teachers: [
    {
      id: string;
      firstName: string;
      middleName: string;
      lastName: string;
    },
  ];
}
