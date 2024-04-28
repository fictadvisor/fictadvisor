import { IsNotEmpty, IsOptional } from 'class-validator';
import { PaymentTypeParam, StudyFormParam, StudyTypeParam } from '../enums/params/StudyContractParams';

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
    paymentType: PaymentTypeParam;

  @IsOptional()
    phone: string;

  @IsOptional()
    isDorm: boolean;

  @IsOptional()
    printedEdbo: boolean;
}