import { DetailedEventBody } from '@/lib/api/schedule/types/DetailedEventBody';
import { SharedEventBody } from '@/lib/api/schedule/types/shared';

export const transformDetailedEvent = (
  event: DetailedEventBody,
): SharedEventBody => {
  const resultedEvent: SharedEventBody = JSON.parse(JSON.stringify(event));

  resultedEvent.teachers = resultedEvent.teachers
    ? event.teachers.map(teacher => teacher.id)
    : [];
  if (!resultedEvent.url) resultedEvent.url = '';
  if (!resultedEvent.disciplineInfo) resultedEvent.disciplineInfo = undefined;
  if (!resultedEvent.eventInfo) resultedEvent.eventInfo = undefined;

  return resultedEvent;
};
