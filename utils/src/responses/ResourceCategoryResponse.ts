import { ApiProperty } from '@nestjs/swagger';

export class ResourceCategoryResponse {
  @ApiProperty({
    description: 'Resource category id',
  })
    id: string;
  
  @ApiProperty({
    description: 'Resource category name',
  })
    name: string;
}