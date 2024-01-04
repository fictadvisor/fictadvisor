export enum TDiscipline {
  LECTURE = 'LECTURE',
  PRACTICE = 'PRACTICE',
  LABORATORY = 'LABORATORY',
  CONSULTATION = 'CONSULTATION',
  WORKOUT = 'WORKOUT',
  EXAM = 'EXAM',
}

export interface Event {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  disciplineType: {
    id: string;
    disciplineId: string;
    name: TDiscipline;
  } | null;
}

export enum TEventPeriod {
  NO_PERIOD = 'NO_PERIOD',
  EVERY_WEEK = 'EVERY_WEEK',
  EVERY_FORTNIGHT = 'EVERY_FORTNIGHT',
}
