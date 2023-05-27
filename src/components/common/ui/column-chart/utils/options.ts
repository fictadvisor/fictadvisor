import { ChartOptions } from 'chart.js';

export const getOptions = (): ChartOptions<'bar'> => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        border: {
          display: false,
        },
        type: 'linear',
        beginAtZero: true,
        grid: {
          color: context => {
            const index = context.index;
            const ticks = context.chart.scales.y.ticks.length;
            if (index === ticks - 1 || index === 0) {
              return 'rgba(0, 0, 0, 0)';
            }
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            const gradient = ctx.createLinearGradient(
              chartArea.left,
              0,
              chartArea.right,
              0,
            );
            gradient.addColorStop(0, 'rgba(64, 64, 64, 0.1)');
            gradient.addColorStop(0.1, 'rgba(64, 64, 64, 0.9)');
            gradient.addColorStop(0.5, 'rgba(64, 64, 64, 1)');
            gradient.addColorStop(0.9, 'rgba(64, 64, 64, 0.9)');
            gradient.addColorStop(1, 'rgba(64, 64, 64, 0.1)');

            return gradient;
          },
          tickWidth: 0,
        },
        ticks: {
          callback: function (value, index, values) {
            if (index === values.length - 1) {
              return '';
            }
            return value;
          },
        },
      },
      x: {
        border: {
          display: false,
        },
        type: 'category',
        grid: {
          display: false,
        },
      },
    },
  };
};
