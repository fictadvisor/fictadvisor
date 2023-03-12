export interface UpdateDynamicLessonBody {
  isTest?: boolean;
  homework?: string;
  url?: string;
  startDate?: Date;
  endDate?: Date;
  comment?: string;
}
