import { PatchEventBody } from '@/lib/api/schedule/types/PatchEventBody';
import { SharedEventBody } from '@/lib/api/schedule/types/shared';

export const prepareData = (
  dataFromForm: Partial<SharedEventBody>,
  initialData: Partial<SharedEventBody>,
  week: number,
): PatchEventBody => {
  const finalData: PatchEventBody = JSON.parse(JSON.stringify(dataFromForm));
  for (const _key in finalData) {
    const key = _key as keyof SharedEventBody;
    if (
      JSON.stringify(dataFromForm[key]) === JSON.stringify(initialData[key]) &&
      key !== 'teachers' &&
      key !== 'startTime' &&
      key !== 'endTime'
    ) {
      delete finalData[key];
    }
  }

  if (finalData.disciplineType?.length === 0) finalData.disciplineType = null;

  finalData.changeStartDate =
    new Date(initialData.startTime as string).toDateString() !==
    new Date(dataFromForm.startTime as string).toDateString();

  finalData.week = week;

  return finalData;
};
