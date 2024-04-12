export function deleteCommonValues(
  firstArray: Array<string>,
  secondArray: Array<string>,
) {
  const commonValues = [...firstArray].filter(value =>
    secondArray.includes(value),
  );
  firstArray.splice(
    0,
    firstArray.length,
    ...firstArray.filter(value => !commonValues.includes(value)),
  );
  secondArray.splice(
    0,
    secondArray.length,
    ...secondArray.filter(value => !commonValues.includes(value)),
  );
}
