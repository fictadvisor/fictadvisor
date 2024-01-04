import { ChartData } from 'chart.js';

import theme from '@/styles/theme';

import { TeacherEvaluations } from '../types';

const getData = (data: TeacherEvaluations): ChartData<'bar'> => {
  const { mark, name } = data;
  return {
    labels: Object.keys(mark),
    datasets: [
      {
        label: name,
        data: Object.values(mark),
        backgroundColor: theme.palette.primary[300],
        borderWidth: 0,
        borderRadius: 3,
        barThickness: 14,
        hoverBackgroundColor: theme.palette.primary[300],
      },
    ],
  };
};

export default getData;
