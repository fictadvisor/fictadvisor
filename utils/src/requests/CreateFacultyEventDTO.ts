import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';
import { Type } from 'class-transformer';

export class CreateFacultyEventDTO {
    @ApiProperty({
        description: 'Name of the event',
    })
    @IsString(validationOptionsMsg('Name should be string'))
    @MinLength(2, validationOptionsMsg('Name is too short (min: 2)'))
    @MaxLength(150, validationOptionsMsg('Name is too long (max: 150)'))
    @IsNotEmpty(validationOptionsMsg('Name cannot be empty'))
    name: string;

    @ApiProperty({
        description: 'Start time of the event',
    })
    @IsNotEmpty(validationOptionsMsg('Start time cannot be empty'))
    @Type(() => Date)
    @IsDate(validationOptionsMsg('Start time must be Date'))
    startTime: Date;

    @ApiProperty({
        description: 'End time of the event',
    })
    @IsNotEmpty(validationOptionsMsg('End time cannot be empty'))
    @Type(() => Date)
    @IsDate(validationOptionsMsg('End time must be Date'))
    endTime: Date;

    @ApiPropertyOptional({
        description: 'Attached link to the event',
    })
    @IsOptional()
    @IsUrl(undefined, validationOptionsMsg('Url must be a URL address'))
    url?: string;

    @ApiPropertyOptional({
        description: 'Description of the event',
    })
    @MaxLength(2000, validationOptionsMsg('Event description is too long (max: 2000)'))
    @IsString(validationOptionsMsg('Event info should be string'))
    @IsOptional()
    eventInfo?: string;
}
