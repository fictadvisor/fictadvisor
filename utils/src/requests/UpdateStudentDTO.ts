import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID, Matches, MaxLength, MinLength } from 'class-validator';
import {
  createRegex,
  UKR_REGEX,
  UKRSPEC_REGEX,
  validationOptionsMsg
} from '../ValidationUtil';
import { GroupRoles } from '../enums/other/GroupRolesEnum';
import { RoleName } from '../enums/db/RoleNameEnum';

export class UpdateStudentDTO {
  @ApiPropertyOptional({
    description: 'First name of an updated student',
  })
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('First name is not correct (A-Я(укр.)\\-\' )'),
  )
  @MinLength(2, validationOptionsMsg('First name is too short (min 2)'))
  @MaxLength(40, validationOptionsMsg('First name is too long (max 40)'))
  @IsOptional()
    firstName?: string;

  @ApiPropertyOptional({
    description: 'Last name of an updated student',
  })
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('Last name is not correct (A-Я(укр.)\\-\' )'),
  )
  @MinLength(2, validationOptionsMsg('Last name is too short (min 2)'))
  @MaxLength(40, validationOptionsMsg('Last name is too long (max 40)'))
  @IsOptional()
    lastName?: string;

  @ApiPropertyOptional({
    description: 'Middle name of an updated student',
  })
  @Matches(
    createRegex(UKR_REGEX, UKRSPEC_REGEX),
    validationOptionsMsg('Middle name is not correct (A-Я(укр.)\\-\' )'),
  )
  @MaxLength(40, validationOptionsMsg('Middle name is too long (max 40)'))
  @IsOptional()
    middleName?: string;
}

export class UpdateStudentWithRolesDTO extends UpdateStudentDTO {
  @ApiPropertyOptional({
    enum: GroupRoles,
    description: 'Student roles',
  })
  @IsEnum(GroupRoles, validationOptionsMsg('Role name should be an enum'))
  @IsOptional()
    roleName?: keyof typeof GroupRoles;

  @ApiPropertyOptional({
    description: 'Student\'s group',
  })
  @IsUUID(undefined, validationOptionsMsg('Group id should be UUID'))
  @IsOptional()
    groupId?: string;
}