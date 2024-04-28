import { ApiProperty } from '@nestjs/swagger';
import { PaginationDataResponse } from './PaginationDataResponse';
import { CathedraWithNumberOfTeachersResponse } from './CathedraWithNumberOfTeachersResponse';


export class PaginatedCathedrasWithTeachersResponse {
  @ApiProperty({
    description: 'The array of cathedras with number of teachers ',
    type: [CathedraWithNumberOfTeachersResponse],
  })
    cathedras: CathedraWithNumberOfTeachersResponse[];

  @ApiProperty({
    description: 'Pagination parameters',
  })
    pagination: PaginationDataResponse;
}