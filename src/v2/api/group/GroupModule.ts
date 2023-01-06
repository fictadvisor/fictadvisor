import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { GroupController } from './GroupController';
import { GroupService } from './GroupService';
import { GroupByIdPipe } from './GroupByIdPipe';

@Module({
  controllers: [GroupController],
  providers: [PrismaService, GroupService, GroupByIdPipe],
  exports: [GroupService, GroupByIdPipe],
})
export class GroupModule {}