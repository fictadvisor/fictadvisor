import { TeacherState } from '../../../database/entities/teacher.entity';

export class TeacherUpdateDto {
    @IsOptional()
    firstName?: string;

    @IsOptional()
    lastName?: string;

    @IsOptional()
    middleName?: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    @IsEnum(TeacherState)
    state?: TeacherState;
};
