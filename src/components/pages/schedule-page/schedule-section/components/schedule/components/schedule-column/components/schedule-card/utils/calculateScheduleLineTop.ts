export const calculateScheduleLineTop = (
  startTime: string,
  endTime: string,
  currentTime: string,
): number => {
  if (startTime && endTime && currentTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const current = new Date(currentTime);
    const eventDuration = end.getTime() - start.getTime();
    const elapsedTime = current.getTime() - start.getTime();
    return (elapsedTime / eventDuration) * 100;
  }
  return 0;
};
