import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { GroupController } from './GroupController';
import { GroupService } from './GroupService';

@Module({
  controllers: [GroupController],
  providers: [PrismaService, GroupService],
  exports: [GroupService],
})
export class GroupModule {}