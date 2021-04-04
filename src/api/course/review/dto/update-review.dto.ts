import { IsEnum, IsOptional, Max, Min } from "class-validator";
import { ReviewState } from "src/database/entities/review.entity";

export class UpdateReviewDto {
    @IsOptional()
    @Max(5)
    @Min(1)
    rating?: number;

    content?: string;

    @IsOptional()
    @IsEnum(ReviewState)
    state?: ReviewState;
};
