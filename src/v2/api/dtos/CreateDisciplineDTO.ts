import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDisciplineDTO {
  @ApiProperty({
    description: 'Group Id to bind discipline',
  })
  @IsNotEmpty(validationOptionsMsg('Group id can not be empty'))
    groupId: string;

  @ApiProperty({
    description: 'Subject id to create discipline',
  })
  @IsNotEmpty(validationOptionsMsg('Subject id can not be empty'))
    subjectId: string;

  @ApiProperty({
    description: 'Semester number',
  })
  @IsNumber()
    semester: number;

  @ApiProperty({
    description: 'Year number',
  })
  @IsNumber()
    year: number;

  @ApiPropertyOptional({
    description: 'Whether discipline is selective or not',
    default: false,
  })
  @IsOptional()
    isSelective?: boolean;

  @ApiPropertyOptional({
    description: 'Some discipline description',
    default: '',
  })
  @IsOptional()
    description?: string;
}
