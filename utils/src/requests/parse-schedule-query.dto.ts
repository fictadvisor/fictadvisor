import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ParserTypeEnum } from '../enums';
import { IsEnum, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { validationOptionsMsg } from '../validation.util';

export class ParseScheduleQueryDTO {
  @ApiProperty({
    enum: ParserTypeEnum,
    description: 'Type of parser',
  })
  @IsNotEmpty(validationOptionsMsg('Parser type cannot be empty'))
  @IsEnum(ParserTypeEnum, validationOptionsMsg('Parser type must be an enum'))
    parser: ParserTypeEnum;

  @ApiProperty({
    description: 'Academic year',
  })
  @IsNotEmpty(validationOptionsMsg('Year cannot be empty'))
  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, validationOptionsMsg('Year value must be of type number'))
    year: number;

  @ApiProperty({
    enum: [1, 2],
    description: 'Semester number',
  })
  @IsNotEmpty(validationOptionsMsg('The year cannot be empty'))
  @Transform(({ value }) => parseInt(value))
  @IsIn([1, 2], validationOptionsMsg('Semester must be either 1 or 2'))
    semester: number;

  @ApiPropertyOptional({
    description: 'Page number for rozkpi parser',
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, validationOptionsMsg('Page value must be of type number'))
  page?: number;

  @ApiPropertyOptional({
    description: 'Names of academic groups (separated by ;)',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('The groups value must be of type string'))
    groups?: string;
}
