import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';

// The year names the stored object, so an upload never depends on what the
// browser called the file.
export class UploadSelectiveFileQueryDTO {
  @ApiProperty({
    description: 'Academic year the selectives belong to',
  })
  @IsNotEmpty(validationOptionsMsg('Year cannot be empty'))
  @Transform(({ value }) => parseInt(value))
  @IsNumber({}, validationOptionsMsg('Year must be of type number'))
    year: number;
}

// A file holds both semesters of its year — the parser keeps the rows of the
// one it is asked for, so the semester is chosen per run rather than per file.
export class ParseSelectiveFileQueryDTO {
  @ApiProperty({
    enum: [1, 2],
    enumName: 'SemesterNumber',
    description: 'Semester to import from the file',
  })
  @IsNotEmpty(validationOptionsMsg('Semester cannot be empty'))
  @Transform(({ value }) => parseInt(value))
  @IsIn([1, 2], validationOptionsMsg('Semester must be either 1 or 2'))
    semester: number;
}
