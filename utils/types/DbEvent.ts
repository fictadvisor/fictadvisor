import { DisciplineType, EventInfo, Group, Period } from '@prisma/client';

export class DbEvent {
  id: string;
  name: string;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
  period: Period;
  url: string;
  group: Group;
  groupId: string;
  eventInfo: EventInfo[];
  eventsAmount: number;
  teacherForceChanges: boolean;
  isCustom: boolean;
  lessons: {
    eventId: string;
    disciplineTypeId: string;
    disciplineType: DisciplineType;
  }[];
}
