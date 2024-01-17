import { IsEnum, IsNotEmpty, IsOptional, IsUUID, Matches, MaxLength, MinLength } from 'class-validator';
import { createRegex, ENG_REGEX, NUM_REGEX, UKR_REGEX, UKRSPEC_REGEX, validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GroupRoles } from './QueryAllStudentDTO';
import { RoleName } from '@prisma/client';

export class CreateStudentDTO {
  @ApiProperty({
    description: 'First name of a created student',
  })
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('First name is not correct (A-Я(укр.)\\-\' )'),
  )
  @MinLength(2, validationOptionsMsg('First name is too short (min 2)'))
  @MaxLength(40, validationOptionsMsg('First name is too long (max 40)'))
  @IsNotEmpty()
    firstName: string;

  @ApiProperty({
    description: 'Last name of a created student',
  })
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('Last name is not correct (A-Я(укр.)\\-\' )'),
  )
  @MinLength(2, validationOptionsMsg('Last name is too short (min 2)'))
  @MaxLength(40, validationOptionsMsg('Last name is too long (max 40)'))
  @IsNotEmpty()
    lastName: string;

  @ApiPropertyOptional({
    description: 'Middle name of a created student',
  })
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('Middle name is not correct (A-Я(укр.)\\-\' )'),
  )
  @MaxLength(40, validationOptionsMsg('Middle name is too long (max 40)'))
  @IsOptional()
    middleName?: string;

  @ApiProperty({
    description: 'Student\'s username in the application',
  })
  @Matches(
    new RegExp('^[' + ENG_REGEX + NUM_REGEX + '_' + ']{2,40}$'),
    validationOptionsMsg('Username is not correct (a-zA-Z0-9_), or too short (min: 2), or too long (max: 40)'))
  @IsNotEmpty(validationOptionsMsg('Username cannot be empty'))
    username: string;
}

export class CreateStudentWithRolesDTO extends CreateStudentDTO {
  @ApiProperty({
    enum: GroupRoles,
    description: 'Student roles',
  })
  @IsEnum(GroupRoles, validationOptionsMsg('Role name should be an enum'))
  @IsNotEmpty(validationOptionsMsg('Role name can not be empty'))
    roleName: RoleName;

  @ApiProperty({
    description: 'Student\'s group',
  })
  @IsUUID(undefined, validationOptionsMsg('Group id should be UUID'))
  @IsNotEmpty(validationOptionsMsg('Group id can not be empty'))
    groupId: string;
}