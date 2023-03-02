export interface GetTeacherQuestionsDTO {
  questions: [
    {
      name: string;
      question: string;
      criteria: string;
      type: string;
      id: string;
    },
  ];
}
