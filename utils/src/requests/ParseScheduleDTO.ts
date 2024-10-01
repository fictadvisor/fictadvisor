import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ParserTypeEnum } from '../enums';
import { IsEnum, IsIn, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { validationOptionsMsg } from '../ValidationUtil';

export class ParseScheduleDTO {
  @ApiProperty({
    enum: ParserTypeEnum,
    description: 'Type of parser',
  })
  @IsEnum(ParserTypeEnum, validationOptionsMsg('The parser type must be an enum'))
    parser: ParserTypeEnum;

  @ApiPropertyOptional({
    description: 'Page number for rozkpi parser',
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, validationOptionsMsg('The page value must be of type number'))
    page: number;

  @ApiProperty({
    description: 'Academic year',
  })
  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, validationOptionsMsg('The year must be of type number'))
    year: number;

  @ApiProperty({
    enum: [1, 2],
    description: 'Semester number',
  })
  @Transform(({ value }) => parseInt(value))
  @IsIn([1, 2], validationOptionsMsg('Semester must be either 1 or 2'))
    semester: number;

  @ApiPropertyOptional({
    description: 'Names of academic groups (separated by ;)',
  })
  @IsString(validationOptionsMsg('The groups value must be of type string'))
    groups: string;
}
