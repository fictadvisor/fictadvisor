import { ApiProperty } from '@nestjs/swagger';
import { CommentResponse } from './comment.response';
import { PaginationDataResponse } from './pagination-data.response';


export class PaginatedCommentsResponse {
  @ApiProperty({
    description: 'Question answers with TEXT type (comments)',
    type: [CommentResponse],
  })
    comments: CommentResponse[];

  @ApiProperty({
    description: 'Pagination parameters',
    type: PaginationDataResponse,
  })
    pagination: PaginationDataResponse;
}
