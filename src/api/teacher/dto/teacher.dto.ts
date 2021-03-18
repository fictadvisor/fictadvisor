import { Expose } from "class-transformer";
import { assign } from "src/common/common.object";
import { Teacher } from "src/database/entities/teacher.entity";

export class TeacherDto {
    id: string;

    link: string;

    @Expose({ name: 'first_name' })
    firstName: string;

    @Expose({ name: 'middle_name' })
    middleName?: string;

    @Expose({ name: 'last_name' })
    lastName?: string;

    description: string;

    tags: string[];

    @Expose({ name: 'created_at' })
    createdAt: Date;

    @Expose({ name: 'updated_at' })
    updatedAt: Date;

    public static from(e: Teacher) {
        return assign(
            new TeacherDto(),
            {
                id: e.id,
                link: e.link,
                firstName: e.firstName,
                middleName: e.middleName,
                lastName: e.lastName,
                description: e.description,
                tags: e.tags,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt
            }
        );
    }
}