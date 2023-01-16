export type CreateLessonBody = {
    fortnight?: number,
    startTime: Date,
    endTime: Date,
    disciplineId: string,
    teacherId: string,
    type: string,
}