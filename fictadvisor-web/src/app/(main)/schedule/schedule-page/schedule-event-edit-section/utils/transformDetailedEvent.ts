import { EventResponse } from '@/lib/api/schedule/types/EventResponse';
import { SharedEventBody } from '@/lib/api/schedule/types/shared';

export const transformDetailedEvent = (
  event: EventResponse,
): SharedEventBody => {
  const resultedEvent: SharedEventBody = JSON.parse(JSON.stringify(event));

  resultedEvent.teachers = resultedEvent.teachers
    ? event.teachers.map(teacher => teacher.id)
    : [];
  if (!resultedEvent.url) resultedEvent.url = '';
  if (!resultedEvent.disciplineInfo) {
    // @ts-expect-error Kostili
    resultedEvent.disciplineInfo = undefined;
  }
  if (!resultedEvent.eventInfo) {
    // @ts-expect-error Kostili
    resultedEvent.eventInfo = undefined;
  }

  return resultedEvent;
};
