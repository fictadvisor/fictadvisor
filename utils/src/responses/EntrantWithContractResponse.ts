import { ApiProperty } from '@nestjs/swagger';

export class EntrantWithContractResponse {
  @ApiProperty()
    firstName: string;

  @ApiProperty()
    middleName: string;

  @ApiProperty()
    lastName: string;

  @ApiProperty({
    enum: ['121', '123', '126'],
  })
    specialty: string;

  @ApiProperty({
    minimum: 100,
    maximum: 200,
  })
    competitivePoint: number;

  @ApiProperty()
    contractNumber: string;

  @ApiProperty()
    date: string;
}