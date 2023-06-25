export interface GetSelectiveDisciplinesDTO {
  availableSelectiveAmount: number;
  year: number;
  semester: 1 | 2;
  remainingSelective: [
    {
      disciplineId: string;
      subjectName: string;
    },
  ];
}
