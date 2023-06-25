export interface GetSelectiveDisciplinesBySemesterDTO {
  selective: [
    {
      semester: 1 | 2;
      year: number;
      disciplines: string[];
      amount: number;
    },
  ];
}
