const getData = (grades: number[], names: string[]) => {
  const labels = new Array(grades.length).fill('');
  const formattedValues = grades.map(x => Math.round(x));
  return {
    labels: labels,
    datasets: [
      {
        color: 'white',
        label: 'Оцінка(у %)',
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
        pointRadius: 3,
        lineTension: 0,
        tooltip: {
          callbacks: {
            label: context => {
              return (
                names[context.dataIndex] + ': ' + context.formattedValue + '%'
              );
            },
          },
        },
      },
    ],
  };
};

export default getData;
