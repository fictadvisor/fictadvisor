import { Module } from '@nestjs/common';
import { PollController } from './PollController';
import { PollService } from './PollService';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [PollController],
  providers: [PollService, PrismaService],
  exports: [PollService]
})
export class PollModule {}