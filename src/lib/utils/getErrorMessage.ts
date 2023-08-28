import { isAxiosError } from 'axios';

const getErrorMessage = (error: unknown) => {
  let message = '';
  if (isAxiosError(error)) {
    if (error.response?.data.message) {
      message = error.response.data.message;
    } else if (error.response?.data.messages) {
      message = error.response.data.messages.join(', ');
    }
  }
  return message;
};
export default getErrorMessage;
