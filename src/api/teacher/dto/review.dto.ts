import { Expose } from "class-transformer";
import { assign } from "src/common/common.object";
import { ReviewView } from "src/database/entities/review-view.entity";
import { ReviewCourseDto } from "./review-course.dto";


export class ReviewDto {
	id: string;

	content: string;

	course: ReviewCourseDto;

	rating: number;

	date: Date;

	public static from(e: ReviewView) {
		return assign(
            new ReviewDto(),
            {
            	id: e.id,
            	content: e.content,
            	course: ReviewCourseDto.from(e.course),
            	rating: e.rating,
            	date: e.date
            }
        );
	}
}
