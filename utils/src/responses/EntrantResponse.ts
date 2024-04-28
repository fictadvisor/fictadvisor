import { ApiProperty } from '@nestjs/swagger';

export class EntrantResponse {
  @ApiProperty()
    id: string;

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
}