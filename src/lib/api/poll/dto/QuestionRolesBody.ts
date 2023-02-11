export type QuestionRolesBody = {
  role: string;
  questions: [
    {
      id: string;
      isShown: boolean;
      isRequired: boolean;
    },
  ];
};
