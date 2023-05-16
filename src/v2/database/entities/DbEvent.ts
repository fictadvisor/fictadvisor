import { EventInfo, Group, Lesson, Period } from '@prisma/client';

export class DbEvent {
  id: string;
  name: string;
  startTime: Date;
  endTime: Date;
  period: Period;
  url: string;
  group: Group;
  groupId: string;
  eventInfo: EventInfo[];
  lessons: Lesson[];
}