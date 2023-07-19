import { ApiProperty } from '@nestjs/swagger';
import { DisciplineTypeEnum } from '@prisma/client';

export class DisciplineTypeResponse {
  @ApiProperty()
    id: string;
  @ApiProperty()
    disciplineId: string;
  @ApiProperty({
    enum: DisciplineTypeEnum,
  })
    name: DisciplineTypeEnum;
}