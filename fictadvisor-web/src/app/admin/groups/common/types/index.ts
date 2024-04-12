export interface GroupEditBody {
  code: string;
  admissionYear: number;
  captainId: string;
  moderatorIds: string[];
  eduProgramId: string;
  cathedraId: string;
}
export interface GroupCreateBody {
  code: string;
  eduProgramId: string;
  cathedraId: string;
  admissionYear: number;
}

export interface GroupsSearchFormFields {
  search: string;
  order: 'asc' | 'desc';
  sort: 'code' | 'admission' | 'captain';
  courses: number[];
  cathedras: string[];
  specialities: string[];
}
