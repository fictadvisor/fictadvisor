import { ApiProperty } from '@nestjs/swagger';
import { EntrantResponse } from './EntrantResponse';

class Contract {
  @ApiProperty()
    number: number;

  @ApiProperty()
    date: string;

  @ApiProperty()
    group: string;
}

export class EntrantWithContractResponse extends EntrantResponse {
  @ApiProperty({
    type: Contract,
  })
    contract: Contract;
}