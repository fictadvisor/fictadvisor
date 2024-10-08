import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from '../api/controllers/HealthController';

@Module({
  controllers: [HealthController],
  imports: [TerminusModule],
})
export class HealthModule {}