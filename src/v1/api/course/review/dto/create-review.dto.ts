import { IsOptional, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsOptional()
  @Max(5)
  @Min(1)
    rating?: number;

  content?: string;
}
