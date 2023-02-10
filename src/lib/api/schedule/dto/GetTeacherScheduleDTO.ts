export type GetTeacherScheduleDTO = {
    current?: {
        fortnight: number,
        week: number,
        day: number,
    },
    lessons: [{
        type: string,
        subjectName: string,
        startDate: Date,
        endDate: Date,
        lessonId: string,
        groups: [{
            code: string
            id: string
        }]
    }]
}