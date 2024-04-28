import { ApiProperty } from '@nestjs/swagger';
import { CommentResponse } from './CommentResponse';
import { PaginationDataResponse } from './PaginationDataResponse';


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
