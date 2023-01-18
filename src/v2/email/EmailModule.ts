import { Module } from '@nestjs/common';
import { EmailService } from './EmailService';

@Module({
  exports: [EmailService],
  providers: [EmailService],
})
export class EmailModule {}
