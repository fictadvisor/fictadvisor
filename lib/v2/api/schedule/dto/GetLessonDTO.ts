export type GetLessonDTO = {
  id: string,
  subject: {
    id: string,
    name: string
  },
  teachers: {
    id: string,
    name: string
  }[],
  type: string,
  homework?: string,
  comment?: string,
  isTest?: boolean,
  url: string,
  resources: string,
  evaluatingSystem: string,
  isSelective: boolean,
  startDate: Date,
  endDate: Date,
}