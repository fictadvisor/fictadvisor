import { ChartData } from 'chart.js';

const getData = (
  isMobile: boolean,
  grades: number[],
  names: string[],
): ChartData<'radar'> => {
  const labels = isMobile ? names.map((_, i) => `${i + 1}`) : names;
  const formattedValues = grades.map(x => Math.round(x));
  return {
    labels: labels,
    datasets: [
      {
        data: formattedValues,
        //TODO: replace with theme
        backgroundColor: 'rgba(188, 61, 61, 0.54)',
        //TODO: replace with theme
        borderColor: 'rgba(188, 61, 61, 1)',
        pointBorderColor: 'rgba(188, 61, 61, 1)',
        // TODO: replace with theme
        pointBackgroundColor: '#212121',
        pointBorderWidth: 1,
        borderWidth: 1,
        pointRadius: 4,
      },
    ],
  };
};

export default getData;
