const getOptions = () => {
  return {
    scales: {
      r: {
        min: 10,
        max: 100,
        angleLines: {
          display: false,
        },
        grid: {
          circular: true,
          color: 'transparent',
        },
        beginAtZero: true,
        display: true,
        ticks: {
          display: false,
        },
        pointLabels: {
          color: 'white',
          font: { size: 20 },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
};
export default getOptions;
