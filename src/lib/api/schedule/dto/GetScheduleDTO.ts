export type GetScheduleDTO = {
    current?: {
        fortnight: number,
        week: number,
        day: number,
    },
    lessons: [{
        id: string,
        subjectName: string,
        isSelective: boolean,
        isTest: string,
        type: string,
        startDate: Date,
        endDate: Date,
    }]
}
