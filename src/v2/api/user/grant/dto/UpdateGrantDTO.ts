import { IsOptional } from 'class-validator';

export class UpdateGrantDTO {
  @IsOptional()
    permission?: string;

  @IsOptional()
    set?: boolean;
}