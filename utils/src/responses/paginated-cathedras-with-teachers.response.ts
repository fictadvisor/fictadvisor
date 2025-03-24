import { ApiProperty } from '@nestjs/swagger';
import { PaginationDataResponse } from './pagination-data.response';
import { CathedraWithNumberOfTeachersResponse } from './cathedra-with-number-of-teachers.response';


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
