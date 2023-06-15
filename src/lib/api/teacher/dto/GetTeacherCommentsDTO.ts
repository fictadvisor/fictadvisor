export interface GetTeacherCommentsDTO {
  questions: {
    name: string;
    amount: number;
    comments: {
      discipline: string;
      semester: 1 | 2;
      year: 2023;
      comment: string;
    }[];
  }[];
}
