import { IsNotEmpty, IsOptional } from 'class-validator';
import { StudyFormParam, StudyTypeParam } from './StudyContractParams';

export class CreateEntrantDTO {
  @IsOptional()
    username: string;

  @IsNotEmpty()
    firstName: string;

  @IsOptional()
    middleName: string;

  @IsNotEmpty()
    lastName: string;

  @IsOptional()
    telegramId: bigint;

  @IsOptional()
    email: string;

  @IsNotEmpty()
    specialty: string;

  @IsNotEmpty()
    studyType: StudyTypeParam;

  @IsNotEmpty()
    studyForm: StudyFormParam;

  @IsOptional()
    phone: string;

  @IsOptional()
    isDorm: boolean;

  @IsOptional()
    printedEdbo: boolean;
}