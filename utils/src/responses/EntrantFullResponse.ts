import { ApiProperty } from '@nestjs/swagger';
import { Priorities } from './EntrantWithPriorityResponse';
import { EntrantResponse } from './EntrantResponse';
import { PaymentTypeParam, StudyFormParam, StudyTypeParam } from '../enums/params/StudyContractParams';
import { PriorityState } from '../enums/db/PriorityStateEnum';

class EntrantDataResponse {
  @ApiProperty()
    entrantId: string;

  @ApiProperty()
    passportSeries: string;

  @ApiProperty()
    passportNumber: string;

  @ApiProperty()
    passportInstitute: string;

  @ApiProperty()
    passportDate: string;

  @ApiProperty()
    region: string;

  @ApiProperty()
    settlement: string;
  
  @ApiProperty()
    address: string;

  @ApiProperty()
    index: string;

  @ApiProperty()
    idCode: string;

  @ApiProperty()
    phoneNumber: string;

  @ApiProperty()
    email: string;
}

class RepresentativeDataResponse extends EntrantDataResponse {
  @ApiProperty()
    firstName: string;

  @ApiProperty()
    middleName?: string;

  @ApiProperty()
    lastName: string;
}

class ContractResponse {
  @ApiProperty()
    entrantId: string;

  @ApiProperty()
    number: string;

  @ApiProperty()
    date: string;

  @ApiProperty()
    group: string;
}

class PriorityResponse {
  @ApiProperty()
    entrantId: string;

  @ApiProperty({
    enum: PriorityState,
  })
    state: PriorityState;

  @ApiProperty()
    date: string;

  @ApiProperty({
    type: Priorities,
  })
    priorities: Priorities;
}

export class EntrantFullResponse extends EntrantResponse {
  @ApiProperty({
    enum: StudyTypeParam,
  })
    studyType: StudyTypeParam;

  @ApiProperty({
    enum: StudyFormParam,
  })
    studyForm: StudyFormParam;

  @ApiProperty({
    enum: PaymentTypeParam,
  })
    paymentType: PaymentTypeParam;

  @ApiProperty({
    type: EntrantDataResponse,
  })
    entrantData: EntrantDataResponse;

  @ApiProperty({
    type: RepresentativeDataResponse,
  })
    representativeData: RepresentativeDataResponse;

  @ApiProperty({
    type: ContractResponse,
  })
    contract: ContractResponse;

  @ApiProperty({
    type: PriorityResponse,
  })
    priority: PriorityResponse;
}