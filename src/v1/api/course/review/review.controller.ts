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
import { type Page } from 'src/v1/common/common.api';
import { SearchableQueryDto } from 'src/v1/common/common.dto';
import { Authorize } from 'src/v1/security/security.authorization';
import { Context, SecurityContext } from 'src/v1/security/security.context';
import { CreateReviewDto } from './dto/create-review.dto';
import { type CourseReviewDto } from './dto/review-item.dto';
import { type ReviewDto } from './dto/review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewService } from './review.service';

@Controller()
export class ReviewController {
  constructor (private readonly reviewService: ReviewService) {}

  @Get('/courses/:link/reviews')
  async getReviews (
    @Param('link') link: string,
      @Query() query: SearchableQueryDto
  ): Promise<Page<CourseReviewDto>> {
    return await this.reviewService.getReviews(link, query);
  }

  @Authorize()
  @Post('/courses/:link/reviews')
  async createReview (
    @Param('link') link: string,
      @Context() ctx: SecurityContext,
      @Body() body: CreateReviewDto
  ): Promise<ReviewDto> {
    return await this.reviewService.createReview(link, ctx.user, body);
  }

  @Authorize({ telegram: true })
  @Put('/reviews/:id')
  async updateReview (
    @Param('id') id: string,
      @Body() body: UpdateReviewDto
  ): Promise<ReviewDto> {
    return await this.reviewService.updateReview(id, body);
  }

  @Authorize({ telegram: true })
  @Delete('/reviews/:id')
  async deleteReview (@Param('id') id: string): Promise<void> {
    await this.reviewService.deleteReview(id);
  }
}
