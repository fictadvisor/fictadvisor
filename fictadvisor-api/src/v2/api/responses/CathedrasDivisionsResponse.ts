import { ApiProperty } from '@nestjs/swagger';

export class CathedrasDivisionsResponse {
  @ApiProperty({
    description: 'Array of division names',
  })
    divisions: string[];
}
