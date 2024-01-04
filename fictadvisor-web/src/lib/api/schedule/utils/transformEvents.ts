import {
  GetEventBody,
  GetEventTransformedBody,
} from '@/lib/api/schedule/types/GetEventBody';
import { Event } from '@/types/schedule';

const MS_IN_DAY = 1000 * 60 * 60 * 24;
const MS_IN_WEEK = MS_IN_DAY * 7;
export function transformEvents({
  events,
  week,
  startTime,
}: GetEventBody): GetEventTransformedBody {
  const firstDayDate = new Date(startTime);
  const firstDayDateMs = firstDayDate.getTime();

  for (const event of events) {
    if (new Date(event.startTime).getTime() < firstDayDateMs) {
      console.error(event);

      throw new Error(
        `An event cannot occur before start of the week, wrong information from backend`,
      );
    }
  }

  let helperMs = firstDayDateMs;

  const allEvents: (Event[] | Event)[] = [];
  const groupedEvents: Event[][] = [];
  const resultedData: GetEventTransformedBody = {
    week: week,
    days: [],
  };

  for (let i = 0; i < 7; i++) {
    const date = new Date(helperMs);
    resultedData.days.push({
      events: [],
      day: date,
      week,
    });
    helperMs += MS_IN_DAY;
  }

  for (const event of events) {
    if (
      events.some(
        _event =>
          _event !== event &&
          _event.startTime === event.startTime &&
          _event.endTime === event.endTime,
      )
    ) {
      //push this event to repeated events
      const _events = groupedEvents.find(
        _events => _events[0].startTime === event.startTime,
      );

      if (_events) _events.push(event);
      else groupedEvents.push([event]);
    } else {
      allEvents.push(event);
    }
  }

  allEvents.push(...groupedEvents);
  allEvents.sort((_event1, _event2) => {
    const event1: Event = Array.isArray(_event1) ? _event1[0] : _event1;
    const event2: Event = Array.isArray(_event2) ? _event2[0] : _event2;

    return (
      new Date(event1.startTime).getTime() -
      new Date(event2.startTime).getTime()
    );
  });

  for (const _event of allEvents) {
    const event: Event = Array.isArray(_event) ? _event[0] : _event;

    const eventMs = new Date(event.startTime).getTime() - firstDayDateMs;
    const dateIndex = Math.floor((eventMs / MS_IN_WEEK) * 7);
    resultedData.days[dateIndex].events.push(_event);
  }

  return resultedData;
}
