import { isServer } from '../constants/isServer';

export const getClientCookie = (name: string): string | undefined => {
  if (isServer) return;

  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
    ?.split('=')[1];

  return cookieValue;
};
