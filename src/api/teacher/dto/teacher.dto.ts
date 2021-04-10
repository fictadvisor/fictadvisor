import { Expose } from "class-transformer";
import { assign } from "src/common/common.object";
import { TeacherView } from "src/database/entities/teacher-view.entity";
import { TEACHER_IMAGE_PLACEHOLDER } from "src/database/entities/teacher.entity";

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
    
    image: string;

    tags: string[];

    rating: number;

    @Expose({ name: 'created_at' })
    createdAt: Date;

    @Expose({ name: 'updated_at' })
    updatedAt: Date;

    public static from(e: TeacherView) {
        return assign(
            new TeacherDto(),
            {
                id: e.id,
                link: e.link,
                firstName: e.firstName,
                middleName: e.middleName,
                lastName: e.lastName,
                description: e.description,
                image: e.image ?? TEACHER_IMAGE_PLACEHOLDER,
                tags: e.tags,
                rating: e.rating,
                createdAt: e.createdAt,
                updatedAt: e.updatedAt
            }
        );
    }
};