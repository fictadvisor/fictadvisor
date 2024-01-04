const chooseMessageError = (errorName: string, tries: number): string => {
  let errorMessage = 'Як ти це зробив?';
  if (errorName === 'TooManyActionsException') {
    tries++;
    if (tries >= 5) errorMessage = 'Да ти заєбав';
    else errorMessage = ' Час для надсилання нового листа ще не сплив';
  } else if (errorName === 'NotRegisteredException') {
    errorMessage = 'Упс, реєструйся заново';
  }
  return errorMessage;
};

export default chooseMessageError;
