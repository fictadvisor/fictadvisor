export type UpdateStaticLessonBody = {
    startDate?: Date,
    endDate?: Date,
    teachersId?: string[],
    url?: string,
    resource?: string,
    evaluatingSystem?: string,
    isSelective?: boolean,
}