export interface GetSelectivesResponse {
  semester: 1 | 2;
  year: number;
  selective: Array<{ id: string; name: string }>;
}
