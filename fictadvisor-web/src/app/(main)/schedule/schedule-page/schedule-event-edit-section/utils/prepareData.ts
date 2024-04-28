import { SharedEventBody } from '@/lib/api/schedule/types/shared';
import { UpdateEventDTO } from '@/lib/api/schedule/types/UpdateEventDTO';

export const prepareData = (
  dataFromForm: Partial<SharedEventBody>,
  initialData: Partial<SharedEventBody>,
  week: number,
): UpdateEventDTO => {
  const finalData: UpdateEventDTO = JSON.parse(JSON.stringify(dataFromForm));
  for (const _key in finalData) {
    const key = _key as keyof SharedEventBody;
    if (
      JSON.stringify(dataFromForm[key]) === JSON.stringify(initialData[key]) &&
      key !== 'teachers' &&
      key !== 'disciplineId' &&
      key !== 'startTime' &&
      key !== 'endTime'
    ) {
      delete finalData[key];
    }
  }

  if (finalData.eventType?.length === 0) finalData.eventType = undefined;

  finalData.changeStartDate =
    new Date(initialData.startTime as string).toDateString() !==
    new Date(dataFromForm.startTime as string).toDateString();

  finalData.week = week;

  return finalData;
};
