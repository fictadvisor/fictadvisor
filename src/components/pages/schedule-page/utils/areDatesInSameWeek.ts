export const areDatesInSameWeek = (
  eventsTime: string,
  currentTime: string,
): boolean => {
  const copyEventsTime = new Date(eventsTime);
  const copyCurrentTime = new Date(currentTime);
  copyEventsTime.setHours(0, 0, 0, 0);
  copyEventsTime.setDate(copyEventsTime.getDate() - copyEventsTime.getDay());
  copyCurrentTime.setHours(0, 0, 0, 0);
  copyCurrentTime.setDate(copyCurrentTime.getDate() - copyCurrentTime.getDay());
  return copyEventsTime.getTime() === copyCurrentTime.getTime();
};
