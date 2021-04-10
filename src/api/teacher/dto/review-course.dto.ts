import { Expose } from "class-transformer";
import { assign } from "src/common/common.object";
import { Course } from "src/database/entities/course.entity";

export class ReviewCourseDto {
	id: string;

	name: string;

	link: string;

	public static from(c: Course) {
		return assign(
			new ReviewCourseDto,
			{
				id: c.id,
				name: c.subject.name,
				link: c.link,
			}
		);
	}
}