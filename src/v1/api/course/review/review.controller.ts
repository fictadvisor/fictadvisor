import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Page } from 'src/v1/common/common.api';
import { SearchableQueryDto } from 'src/v1/common/common.dto';
import { Authorize } from 'src/v1/security/security.authorization';
import { Context, SecurityContext } from 'src/v1/security/security.context';
import { CreateReviewDto } from './dto/create-review.dto';
import { CourseReviewDto } from './dto/review-item.dto';
import { ReviewDto } from './dto/review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewService } from './review.service';

@Controller()
export class ReviewController {
  constructor (private reviewService: ReviewService) {}

  @Get('/courses/:link/reviews')
  getReviews (
    @Param('link') link: string,
    @Query() query: SearchableQueryDto
  ): Promise<Page<CourseReviewDto>> {
    return this.reviewService.getReviews(link, query);
  }

  @Authorize()
  @Post('/courses/:link/reviews')
  createReview (
    @Param('link') link: string,
    @Context() ctx: SecurityContext,
    @Body() body: CreateReviewDto
  ): Promise<ReviewDto> {
    return this.reviewService.createReview(link, ctx.user, body);
  }

  @Authorize({ telegram: true })
  @Put('/reviews/:id')
  updateReview (
    @Param('id') id: string,
    @Body() body: UpdateReviewDto
  ): Promise<ReviewDto> {
    return this.reviewService.updateReview(id, body);
  }

  @Authorize({ telegram: true })
  @Delete('/reviews/:id')
  deleteReview (@Param('id') id: string): Promise<void> {
    return this.reviewService.deleteReview(id);
  }
}
