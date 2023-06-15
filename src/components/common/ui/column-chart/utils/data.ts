import { ChartData } from 'chart.js';

import { GetTeacherEvaluationsDTO } from '@/lib/api/teacher/dto/GetTeacherEvaluationsDTO';
import palette from '@/styles/theme/constants/pallete';

export const getData = (data: GetTeacherEvaluationsDTO): ChartData<'bar'> => {
  const { mark, name } = data;
  return {
    labels: Object.keys(mark),
    datasets: [
      {
        label: name,
        data: Object.values(mark),
        backgroundColor: palette.primary[300],
        borderWidth: 0,
        borderRadius: 3,
        barThickness: 14,
        hoverBackgroundColor: palette.primary[300],
      },
    ],
  };
};
