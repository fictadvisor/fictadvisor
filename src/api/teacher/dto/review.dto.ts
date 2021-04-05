import { Expose } from "class-transformer";
import { assign } from "src/common/common.object";
import { ReviewView } from "src/database/entities/review-view.entity";

export class ReviewDto {
	id: string;
	content: string;
	course: {
		id: string;
		name: string;
		link: string;
	};
	rating: number;
	date: Date;

	public static from(e: ReviewView) {
		return assign(
            new ReviewDto(),
            {
            	id: e.id,
            	content: e.content,
            	course: {
            		id: e.courseId,
            		name: e.courseName,
            		link: e.courseLink
            	},
            	rating: e.rating,
            	date: e.date
            }
	}
}
