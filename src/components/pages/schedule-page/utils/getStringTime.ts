/**
 * @param time - time in ISOString format
 */

export const getStringTime = (time: string) => {
  const now = new Date(time);
  const hours = now.getHours().toString().padStart(2, '0'); // Ensure two-digit format
  const minutes = now.getMinutes().toString().padStart(2, '0'); // Ensure two-digit format
  return `${hours}:${minutes}`;
};
