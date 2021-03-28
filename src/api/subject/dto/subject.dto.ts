import { Expose } from "class-transformer";
import { SubjectView } from "../../../database/entities/subject-view.entity";
import { assign } from "../../../common/common.object";

export class SubjectDto {
    id: string;

    link: string;

    name: string;

    description?: string

    @Expose({ name: 'teacher_count' })
    teacherCount: number

    rating: number

    @Expose({ name: 'created_at' })
    createdAt: Date

    @Expose({ name: 'updated_at' })
    updatedAt: Date

    public static from(v: SubjectView) {
        return assign(
            new SubjectDto(),
            {
                id: v.id,
                link: v.link,
                name: v.name,
                description: v.description,
                teacherCount: v.teacherCount,
                rating: v.rating,
                createdAt: v.createdAt,
                updatedAt: v.updatedAt
            }
        )
    }
};
