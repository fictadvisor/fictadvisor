import { ApiProperty } from '@nestjs/swagger';

export class VerifySuperheroResponse {
  @ApiProperty({
    description: 'user\'s id',
  })
    userId: string;
  
  @ApiProperty({
    description: 'whether the superhero is in dormintory or not',
  })
    dorm: boolean;
}