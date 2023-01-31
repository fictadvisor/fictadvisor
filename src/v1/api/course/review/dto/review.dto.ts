import { Expose } from 'class-transformer';
import { assign } from 'src/v1/common/common.object';
import { type Review, type ReviewState } from 'src/v1/database/entities/review.entity';

export class ReviewDto {
  id: string;

  rating: number;

  content: string;

  state: ReviewState;

  @Expose({ name: 'created_at' })
    createdAt: Date;

  @Expose({ name: 'updated_at' })
    updatedAt: Date;

  public static from (r: Review) {
    return assign(new ReviewDto(), {
      id: r.id,
      content: r.content,
      rating: r.rating,
      state: r.state,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    });
  }
}
