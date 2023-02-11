export type CreateTeacherGradeBody = {
  answers: [
    {
      questionId: string;
      value: string;
    },
  ];
};
