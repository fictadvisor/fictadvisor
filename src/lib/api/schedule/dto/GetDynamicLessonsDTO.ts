export type GetDynamicLessonsDTO = {
    current?: {
        fortnight: number,
        week: number,
        day: number,
    },
    lessons: [{
        id: string,
        subjectName: string,
        type: string,
        startDate: Date,
        endDate: Date,
    }]
}
