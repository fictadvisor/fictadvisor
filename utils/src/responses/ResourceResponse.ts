import { ApiProperty } from '@nestjs/swagger';
export class ResourceResponse {
  @ApiProperty({
    description: 'Id of specific student resource',
  })
    id: string;
    
  @ApiProperty({
    description: 'Link to student resource',
  })
    link: string;
  
  @ApiProperty({
    description: 'Name of student resource',
  })
    name: string;
  
  @ApiProperty({
    description: 'icon of student resource',
  })
    imageLink: string;
}