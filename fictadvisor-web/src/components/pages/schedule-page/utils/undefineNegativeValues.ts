export const makeNegativeValuesUndefined = <T extends object>(
  _dataFromForm: T,
) => {
  const dataFromForm = JSON.parse(JSON.stringify(_dataFromForm));

  for (const _key in dataFromForm) {
    const key = _key as keyof T;
    if (!dataFromForm[key]) {
      dataFromForm[key] = undefined;
    }
  }

  return dataFromForm;
};
