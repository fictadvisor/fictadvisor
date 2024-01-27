export interface GetAllResponse {
  specialities: Speciality[];
}

export interface Speciality {
  id: string;
  code: string;
  abbreviation: string;
  name: string;
}
