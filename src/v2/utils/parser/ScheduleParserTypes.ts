enum TagEnum {
  lec,
  lab,
  prac,
}

export class SchedulePairType {
  teacherName: string;
  lecturerId: string;
  type: string;
  time: string;
  name: string;
  place: string;
  tag: TagEnum;
}

export class ScheduleDayType {
  day: string;
  pairs: SchedulePairType[];
}

export class ScheduleGroupType {
  id: string;
  name: string;
  faculty: string;
}

export class ScheduleType {
  groupCode: string;
  scheduleFirstWeek: ScheduleDayType[];
  scheduleSecondWeek: ScheduleDayType[];
}
