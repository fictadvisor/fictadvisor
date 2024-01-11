// eslint-disable-next-line simple-import-sort/imports
import { ChartOptions } from 'chart.js';

import { manrope } from '@/styles/theme/constants/typography/typography';

interface TooltipContext {
  dataIndex: number;
  formattedValue: string;
}

const getOptions = (
  isMobile: boolean,
  labels: string[],
): ChartOptions<'radar'> => {
  return {
    aspectRatio: isMobile ? 1 : 1.5,
    responsive: true,
    scales: {
      r: {
        min: 10,
        max: 100,
        backgroundColor: '#262626',
        angleLines: {
          display: true,
          color: '#343434',
        },
        grid: {
          circular: true,
          color: [
            '#343434',
            '#343434',
            '#343434',
            '#343434',
            '#343434',
            '#343434',
            '#343434',
            '#343434',
            '#343434',
            '#4A4A4A',
          ],
        },
        beginAtZero: true,
        display: true,
        ticks: {
          display: false,
          stepSize: 10,
        },
        pointLabels: {
          display: true,
          padding: isMobile ? 10 : 30,
          color: 'white',
          callback: (t: string) => {
            if (isMobile) return t;
            const words = t.split(' ');
            const result = [];
            for (let i = 0; i < words.length; ) {
              const line = [];
              for (let j = 0; j < 2; j++) {
                line.push(words[i]);
                i++;
              }
              result.push(line.join(' '));
            }
            return result;
          },
          font: {
            size: 14,
            family: manrope.style.fontFamily,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          title: () => {
            return 'Оцінка';
          },
          label: (context: TooltipContext) => {
            return (
              labels[context.dataIndex] + ': ' + context.formattedValue + '%'
            );
          },
        },
      },
    },
  };
};
export default getOptions;
