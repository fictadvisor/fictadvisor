export interface QuestionRolesBody {
  role: string;
  questions: [
    {
      id: string;
      isShown: boolean;
      isRequired: boolean;
    },
  ];
}
