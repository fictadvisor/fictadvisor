import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class TeacherResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    firstName: string;
  
  @ApiPropertyOptional()
    middleName?: string;
  
  @ApiProperty()
    lastName: string;
  
  @ApiPropertyOptional()
    description?: string;
  
  @ApiPropertyOptional()
    avatar?: string;
}


