export interface GetSelectiveResponse {
  year: number;
  semester: 1 | 2;
  selective: {
    id: string;
    name: string;
  }[];
  amount: number;
}
