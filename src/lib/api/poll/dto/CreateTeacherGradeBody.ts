export interface CreateTeacherGradeBody {
  answers: [
    {
      questionId: string;
      value: string;
    },
  ];
}
