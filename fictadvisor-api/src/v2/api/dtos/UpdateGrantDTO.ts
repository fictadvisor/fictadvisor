import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateGrantDTO {
  @ApiPropertyOptional({
    description: 'A string that specifies the permission itself',
  })
  @IsOptional()
    permission?: string;

  @ApiPropertyOptional({
    description: 'Established right or not',
  })
  @IsBoolean({
    message: 'Set must be boolean',
  })
  @IsOptional()
    set?: boolean;

  @ApiPropertyOptional({
    description: 'The priority or importance of the grant',
  })
  @IsNumber({}, {
    message: 'Weight must be a number',
  })
  @IsOptional()
    weight?: number;
}