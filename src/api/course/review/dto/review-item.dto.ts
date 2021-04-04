import { assign } from "src/common/common.object";
import { Review } from "src/database/entities/review.entity";

export class ReviewItemDto {
    id: string;

    content: string;

    rating: number;

    date: Date;

    public static from(r: Review) {
        return assign(
            new ReviewItemDto(),
            {
                id: r.id,
                content: r.content,
                rating: r.rating,
                date: r.createdAt,
            }
        );
    }
};
