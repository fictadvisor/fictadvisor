export interface GetAllResponse {
  programs: Eduprogram[];
}

export interface Eduprogram {
  id: string;
  name: string;
  abbreviation: string;
  groupsAmount: number;
}
