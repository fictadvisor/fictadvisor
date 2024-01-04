import { ApiProperty } from '@nestjs/swagger';
export class ResourceResponse {
  @ApiProperty()
    id: string;
    
  @ApiProperty()
    link: string;
  
  @ApiProperty()
    name: string;
  
  @ApiProperty()
    icon: string;
}