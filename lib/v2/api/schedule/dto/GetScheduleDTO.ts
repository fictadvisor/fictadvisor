export type GetScheduleDTO = {
    week: number,
    lessons: [{
        type: string,
        lessonName: string,
        startTime: Date,
        endTime: Date,
        lessonId: string
    }]
}
