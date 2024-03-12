import { isAxiosError } from 'axios';

const getErrorMessage = (error: unknown) => {
  let message = '';
  if (isAxiosError(error)) {
    const axiosError = error;
    if (axiosError.response?.data?.message) {
      message = axiosError.response.data.message;
    } else if (axiosError.response?.data?.messages) {
      message = axiosError.response.data.messages[0].split(':')[1];
    } else if (axiosError.message) {
      message = axiosError.message;
    }
  }
  return message;
};

export default getErrorMessage;
