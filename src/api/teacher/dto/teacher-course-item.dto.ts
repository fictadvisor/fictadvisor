import { Expose } from "class-transformer";
import { TeacherCourseSearchIndex } from "../../../database/entities/teacher-course-search-index";
import { assign } from "../../../common/common.object";

export class TeacherCourseItemDto {
    id: string;

    link: string;

    name: string;

    @Expose({ name: 'review_count' })
    reviewCount: number;

    rating: number;

    recommended: boolean;

    public static from(v: TeacherCourseSearchIndex): TeacherCourseItemDto {
        return assign(
            new TeacherCourseItemDto(),
            {
                id: v.id,
                link: v.link,
                name: v.name,
                reviewCount: v.reviewCount,
                rating: v.rating,
                recommended: v.recommended
            }
        );
    }
}
