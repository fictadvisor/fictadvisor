import { Expose } from "class-transformer";
import { assign } from "src/common/common.object";
import { ReviewView } from "src/database/entities/review-view.entity";

class Course {
	id: string;

	name: string;

	link: string;

	constructor(id: string, name: string, link: string) {
		this.id = id;
		this.name = name;
		this.link = link;
	}
}

export class ReviewDto {
	id: string;

	content: string;

	course: Course;

	rating: number;

	date: Date;

	public static from(e: ReviewView) {
		return assign(
            new ReviewDto(),
            {
            	id: e.id,
            	content: e.content,
            	course: new Course(
            		e.courseId,
            		e.courseName,
            		e.courseLink
            	),
            	rating: e.rating,
            	date: e.date
            }
        );
	}
}
