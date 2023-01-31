export interface FullLessonDTO {
  id: string
  subject: {
    id: string
    name: string
  }
  teachers: Array<{
    id: string
    name: string
  }>
  type: string
  homework?: string
  comment?: string
  isTest?: boolean
  url: string
  resources: string
  evaluatingSystem: string
  isSelective: boolean
  startDate: Date
  endDate: Date
}
