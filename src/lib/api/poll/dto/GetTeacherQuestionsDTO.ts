export interface GetTeacherQuestionsDTO {
  teacher: {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    avatar: string;
  };
  subject: {
    id: string;
    name: string;
  };
  categories: {
    name: string;
    count: number;
    questions: {
      id: string;
      name: string;
      criteria: string;
      isRequired: boolean;
      text: string;
      type: 'TOGGLE' | 'TEXT' | 'SCALE';
      description: string;
      display: 'AMOUNT' | 'PERCENT' | 'TEXT';
    }[];
  }[];
}
