export interface GetTeacherEvaluationsDTO {
  name: string;
  amount: number;
  type: string;
  mark: Record<number, number>;
}
