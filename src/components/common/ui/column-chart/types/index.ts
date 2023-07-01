export interface TeacherEvaluations {
  name: string;
  amount: number;
  type: string;
  mark: Record<number, number>;
}

export interface ColumnChartProps {
  data: TeacherEvaluations;
  maxValue?: number;
}
