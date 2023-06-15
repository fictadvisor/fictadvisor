const getData = (grades: number[]) => {
  const labels = new Array(grades.length).fill('');
  const formattedValues = grades.map(x => x / 10 - 1);
  return {
    labels: labels,
    datasets: [
      {
        color: 'white',
        label: 'Data',
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
      },
      {
        color: 'transparent',
        label: '',
        data: Array(grades.length).fill(9),
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        pointBorderColor: 'transparent',
        pointBackgroundColor: '#212121',
        pointBorderWidth: 0,
        borderWidth: 0,
        pointRadius: 3,
        lineTension: 0,
      },
    ],
  };
};

export default getData;
